import s from './styles.module.css'
import { useEffect, useState } from 'react';

function gerarMapa(figuras) {
    const newFiguras = [...figuras, ...figuras]

    for (let i = newFiguras.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [newFiguras[i], newFiguras[randomIndex]] = [newFiguras[randomIndex], newFiguras[i]]
    }
    return newFiguras.map((figura, index) => ({
        id: index,
        value: figura,
        estaMostrando: false,
        acertou: false
    }))
}

export default function Accion() {
    const [estaJogando, setEstaJogando] = useState(false)
    const [mapa, setMapa] = useState(gerarMapa(['🔥', '⭐', '🍺', '🍒', '🍌', '🍀']))
    const [escolha, setEscolha] = useState([])
    const [podeJogar, setPodeJogar] = useState(true)
    const [erros, setErros] = useState(0)
    const [acertos, setAcertos] = useState(0)
    function handleClick(index) {
        setMapa((prev) => {
            const newMapa = [...prev]
            newMapa[index] = { ...newMapa[index], estaMostrando: true }
            return newMapa
        })
        setEscolha(prev => [...prev, mapa[index]])
    }

    const ganhou = mapa.every(obj => obj.acertou === true)

    useEffect(() => {
        console.log(ganhou)
        if (escolha.length === 2) {
            if (escolha[0].value === escolha[1].value) {
                setEscolha([])
                setAcertos(prev => prev + 1)
                setMapa((prev) => {
                    const newMapa = [...prev]
                    console.log(newMapa)
                    newMapa[escolha[0].id].acertou = true
                    newMapa[escolha[1].id].acertou = true
                    setPodeJogar(true)
                    return newMapa
                })
                return console.log('acertou caraio')
            }
            console.log(escolha)
            setPodeJogar(false)
            setErros(prev => prev + 1)
            setTimeout(() => {
                setMapa((prev) => {
                    const newMapa = [...prev]
                    console.log(newMapa)
                    newMapa[escolha[0].id].estaMostrando = false
                    newMapa[escolha[1].id].estaMostrando = false
                    setPodeJogar(true)
                    return newMapa
                })
            }, 1000)
            setEscolha([])
            return
        }
        return
    }, [escolha])

    return (
        <>
            <main className={s.main}>
                <h1>Juego de Memoria</h1>
                {
                    estaJogando ?
                        <div className={s.container}>
                            {
                                mapa.map((figura, index) => (
                                    <button disabled={!podeJogar} onClick={() => handleClick(index)} key={index} className={`${s.container__hijo} ${figura.acertou ? s.acertou : ''}`}>{figura.estaMostrando ? figura.value : ''}</button>
                                ))
                            }
                            <p>Acertos: {acertos}</p>
                            <p>Erros: {erros}</p>
                        </div>
                        :
                        <div>
                            <button onClick={() => setEstaJogando(true)} className={s.playButton}>Jogar</button>
                        </div>
                }
                {
                    ganhou && <p className={s.title__win}>ganhou!!!</p>
                }
            </main >
        </>
    )
}

