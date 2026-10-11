import './App.css'
import {useState,useRef,useEffect} from 'react'
import downloadSVG from './assets/download.svg'
import eraseSVG from './assets/erase.svg'
import textSVG from './assets/text.svg'
export default function App(){
  type textOpt = {
    font:string,
    size:number
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [foregroundColor,setForegroundColor] = useState('#000000')
  const [backgroundColor,setBackgroundColor] = useState('#ffffff')
  const [erase,setErase] = useState(false)
  const [eraseRadius,setEraseRadius] = useState(5)
  const [text,setText] = useState(false)
  const [textOptions,setTextOptions] = useState<textOpt>({
    font:'Arial',
    size:12
  })
  useEffect(()=>{

  },[])
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h3>Whiteboard App</h3>
        <div className='grid grid-cols-5 gap-4 border border-black m-2 p-2 rounded-lg'>
          <div className='flex flex-col items-center justify-center'>
            <p>Foreground Color</p>
            <input type='color' value={foregroundColor} onChange={(e)=>{
              setForegroundColor(e.target.value)
            }} />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p>Background Color</p>
            <input type='color' value={backgroundColor} onChange={(e)=>{
              setBackgroundColor(e.target.value)
            }} />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <button className='w-5 h-5 hover:cursor-pointer' title='Download Whiteboard as image'><img src={downloadSVG} alt='Download Button'></img></button>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <button className={`w-5 h-5 hover:cursor-pointer ${erase === true ? 'bg-gray-100' : ''}`} title='Toggle Erase' onClick={()=>setErase(e => !e)}><img src={eraseSVG} alt='Toggle Erase'></img></button>
          </div>
          <div className='flex justify-center items-center flex-col'>
            <button className={`w-5 h-5 hover:cursor-pointer ${text === true ? 'bg-gray-100' : ""}`} onClick={()=>setText(t => !t)} title='Toggle text'><img src={textSVG} alt='Toggle text'></img></button>
          </div>
        </div>
        {erase === true && (
              <div>
                <div className='flex justify-center items-center flex-col'>
                  <p>Erase largeness:</p>
                  <input className='text-center border border-black rounded-lg' type='number' value={eraseRadius} onChange={(e)=>setEraseRadius(Number(e.target.value))} />
                </div>
              </div>
            )}
        {text === true && (
          <div>
            <div className='flex justify-center items-center flex-col'>
              <p>Font: </p>
              <select value={textOptions.font} className='border border-black rounded-lg' onChange={(e)=>{
                setTextOptions(t => {return{size:t.size,font:e.target.value}})
              }}>
                <option value='Arial'>Arial</option>
                <option value='Times New Roman'>Times New Roman</option>
                <option value='Courier New'>Courier New</option>
                <option value='Georgia'>Georgia</option>
                <option value='Verdana'>Verdana</option>
              </select>
              <p>Size: </p>
              <input className='border border-black rounded-lg' type='number' value={textOptions.size} onChange={(e)=>setTextOptions(t => {return {size:Number(e.target.value), font:t.font}})} />
            </div>
          </div>
        )}
        <div className='border border-black rounded-lg m-2 h-auto w-full'>
          <canvas ref={canvasRef}>

          </canvas>
        </div>
      </div>
    </div>
  )
}