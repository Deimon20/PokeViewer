import { useEffect, useRef, useState } from 'react';
import { GenButton } from './components/GenButton';
import { getPokemonsURL } from './services/getPokemonsURL';
import './styles/App.css';


export function App(){
    const [selectedGens, setSelectedGens] = useState([true,false,false,false,false,false,false,false,false])
    const [genData, setGenData] = useState([])
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            let genNewData = []
            getPokemonsURL(selectedGens).then(genURL =>{
                genNewData.push(genURL)
            })
            setGenData(genNewData)
            isFirstRender.current = false
        }
        
        console.log(genData)
    }, [genData])

    function handleClick(event){
        const htmlElement = event.target
        const genNumber = htmlElement.getAttribute('data-gen')
        const newGensArray = [...selectedGens]
        let genNewData = []

        
        newGensArray[genNumber-1] = !newGensArray[genNumber-1]


        if (newGensArray.every(gen => gen === false)){
            return
        }
        
        htmlElement.classList.toggle('selected')
        setSelectedGens(newGensArray)
        getPokemonsURL(newGensArray).then(genURL => {
            genNewData.push(genURL)
        })

        setGenData(genNewData)

    }
   

    return (
        <div className="pk-wrapper">
            <header className="pk-logo">Logo</header>

            <main>
                <section className="pk-gen-selector__layout" onClick={handleClick}>
                    {
                        selectedGens.map((value,i)=>{
                            return <GenButton key={i} genNumber={i+1} isSelected={value} />
                        })
                    } 
                    
                </section>

                <section className="pk-display__layout">

                </section>
            </main>

     
        </div>
    )
}