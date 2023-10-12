import fs from 'fs'
import path from 'path'

import { beforeEach, expect, it, vi } from 'vitest'
import { Window } from 'happy-dom'

import { showError } from './dom'

// vanilla way of testing frontend. We stringify a given HTML file in our project
const htmlDocPath = path.join(process.cwd(), 'index.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document

// make the virtual document  avaliable as a global variable (the code in dom.js will now be modifiying this global document variable)
vi.stubGlobal('document', document)

beforeEach(() => {
  // reset the virtual DOM to an empty string
  document.body.innerHTML = ''
  // pass our stringified HTML file to happy-dom so that it can create a virtual DOM out of it (write method concats strings which is why we have to reset the innerHTML to an empty string beforehand)
  document.write(htmlDocumentContent)
  // NOTE: this mutates the document that we stubbed globally.
})

it('should add an error paragraph to the id="errors" element', () => {
  showError('Test')

  const errorsEl = document.getElementById('errors')
  const errorParagraph = errorsEl.firstElementChild

  expect(errorParagraph).not.toBeNull()
})

it('should not contain an error paragraph initially', () => {
  const errorsEl = document.getElementById('errors')
  const errorParagraph = errorsEl.firstElementChild

  expect(errorParagraph).toBeNull()
})

it('should output the provided message in the error paragraph', () => {
  const testErrorMessage = 'Test'

  showError(testErrorMessage)

  const errorsEl = document.getElementById('errors')
  const errorParagraph = errorsEl.firstElementChild

  expect(errorParagraph.textContent).toBe(testErrorMessage)
})
