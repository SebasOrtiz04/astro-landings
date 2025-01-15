import { useState } from 'react'
import Privacy from './privacy'

export default function PrivacyModal() {

  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className={`my-5 h-40 overflow-y-scroll ${open ? 'block' : 'hidden'}`}>
        <Privacy/>
      </div>
      <span className='ml-1.5 text-gray-500 text-xs underline cursor-pointer' onClick={() => setOpen((prev) => !prev)}>Política de privacidad</span>
    </div>
  )
}