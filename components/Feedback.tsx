import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

type Props = {
  children: React.ReactNode
}

export default function Feedback() {
  const [text, setText] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setText('')
    toast('Feedback sent. Thank you')
  }

  const onChangeText = (e: any) => {
    setText(e.target.value)
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="absolute flex flex-col bg-gray-900 border rounded-lg cursor-pointer bottom-3 md:bottom-8 right-1 md:right-8 dark:bg-zinc-800"
      >
        <textarea
          placeholder="Feedback?"
          rows={3}
          value={text}
          onChange={onChangeText}
          className="w-64 h-12 p-2 text-sm transition-all duration-100 bg-transparent border-0 resize-y peer placeholder-shown:h-9 placeholder-shown:w-24 focus:h-12 focus:w-64 focus:outline-none dark:text-white"
        />
        <div className="flex justify-between p-2 overflow-hidden text-sm font-medium transition-all duration-100 opacity-100 peer-placeholder-shown:h-0 peer-placeholder-shown:w-0 peer-placeholder-shown:p-0 peer-placeholder-shown:opacity-100 peer-focus:flex peer-focus:h-auto peer-focus:w-auto peer-focus:p-2 peer-focus:opacity-100">
          <div className="px-2 py-1 bg-red-600 rounded-md dark:bg-zinc-900 dark:text-gray-500">
            Cancel
          </div>
          <input
            type="submit"
            value="Send feedback"
            className="px-2 py-1 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400 dark:hover:bg-blue-600"
          />
        </div>
      </form>
      <Toaster position="bottom-center" />
    </>
  )
}
