const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'log in' })).toBeVisible()
  })

  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      const errorDiv = page.locator('.notification')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })

  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'Understanding JavaScript Closures',
        author: 'Kyle Simpson',
        url: 'https://blog.example.com/js-closures'
      })
      const blog = page.locator('.blog')

      await expect(blog.getByText('Understanding JavaScript Closures')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'Understanding JavaScript Closures',
          author: 'Kyle Simpson',
          url: 'https://blog.example.com/js-closures'
        })
      })

      test('blog can be liked', async ({ page }) => {
        const blogList = page.locator('.blog-list')
        const blog = blogList.getByText('Understanding JavaScript Closures')
        await blog.getByRole('button', { name: 'view' }).click()

        const blogDetails = page.locator('.details')
        await expect(blogDetails).toContainText('likes 0')
        await blogDetails.getByRole('button', { name: 'like' }).click()
        await expect(blogDetails).toContainText('likes 1')
      })

      test('creator can delete their blog', async ({ page }) => {
        const blogList = page.locator('.blog-list')
        const blog = blogList.getByText('Understanding JavaScript Closures')
        await blog.getByRole('button', { name: 'view' }).click()
        const blogDetails = page.locator('.details')

        page.once('dialog', async dialog => {
          expect(dialog.message()).toContain('Delete blog?')
          await dialog.accept()
        })

        blogDetails.getByRole('button', { name: 'delete' }).click()


        await expect(page.locator('.blog-list')).not.toContainText('Understanding JavaScript Closures')
      })

      test('only creator sees the delete button', async ({ page, request }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Second User',
            username: 'seconduser',
            password: 'password123'
          }
        })

        await loginWith(page, 'seconduser', 'password123')

        const blogList = page.locator('.blog-list')
        const blog = blogList.getByText('Understanding JavaScript Closures')
        await blog.getByRole('button', { name: 'view' }).click()

        const deleteButton = page.locator('.details').getByRole('button', { name: 'delete' })
        await expect(deleteButton).toHaveCount(0)
      })

    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, { title: 'first', author: 'Author1', url: 'url-1'})
        await createBlog(page, { title: 'second', author: 'Author2', url: 'url-2'})
        await createBlog(page, { title: 'third', author: 'Author3', url: 'url-3'})
      })

      test('blogs are ordered by number of likes (descending)', async ({ page }) => {
        const firstBlog = await page.locator('.blog').filter({ hasText: 'first' })
        const secondBlog = await page.locator('.blog').filter({ hasText: 'second' })
        const thirdBlog = await page.locator('.blog').filter({ hasText: 'third' })

        await firstBlog.getByRole('button', { name: 'view' }).click()
        await secondBlog.getByRole('button', { name: 'view' }).click()
        await thirdBlog.getByRole('button', { name: 'view' }).click()

        const thirdBlogLike = await thirdBlog.getByRole('button', { name: 'like' })
        const firstBlogLike = await firstBlog.getByRole('button', { name: 'like' })
        const secondBlogLike = await secondBlog.getByRole('button', { name: 'like' })

        await likeBlog(page, thirdBlogLike, 5)
        await likeBlog(page, firstBlogLike, 3)

        await secondBlogLike.click()

        await page.waitForTimeout(200);

        const blogs = await page.locator('.blog')

        await expect(blogs.nth(0)).toContainText('third')
        await expect(blogs.nth(1)).toContainText('first')
        await expect(blogs.nth(2)).toContainText('second')
      })
    })
  })
})