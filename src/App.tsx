import Board from "./Board"

const App:React.FC = () => {
  return (
    <div className="dark:bg-black flex flex-col items-center justify-center dark:text-white w-screen h-screen text-center space-y-4">
      
      <button className="bg-black p-1 w-60 border boder-black dark:border-white border-solid text-white hover:bg-white hover:text-black transition-all">Play online</button>
      <Board/>
    </div>
  )
}



export default App