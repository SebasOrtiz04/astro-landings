import { useState } from 'react'
import Privacy from './privacy'

export default function PrivacyModal() {

  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className={`my-5 h-40 overflow-y-scroll ${open ? 'block' : 'hidden'}`}>
        <Privacy/>
      </div>
      <span className='text-gray-800 text-xs  cursor-pointer' onClick={() => setOpen((prev) => !prev)}>Política de privacidad</span>
    </div>
  )
}
