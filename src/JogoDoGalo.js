import { useState } from "react";
import styles from "./tabuleiro.module.css";
import {
    adicionarJogada,
    JOGO_INICIAL,
    verificarFimDoJogo,
    verificarVencedor,
} from "./jogo-do-galo";

export function JogoDoGalo() {
    const [jogoDoGalo, setJogoDoGalo] = useState(JOGO_INICIAL);
    const vencedor = verificarVencedor(jogoDoGalo);
    const registaJogada = (i, j) => {
        if (!verificarFimDoJogo(jogoDoGalo)) {
            console.log(jogoDoGalo.jogada);
            setJogoDoGalo((jogo) => {
                const jog = adicionarJogada(jogo, jogo.jogadorAtual, i, j);
                return jog;
            });
        }
    };

    return (
        <div className={styles.tabuleiroGalo}>
            <h1 className={styles.titulo}>Tic Tac Toe</h1>
            <div>
                {jogoDoGalo.tabuleiro.map((linha, i) => (
                    <div className={styles.row} key={`${i}`}>
                        {linha.map((casa, j) => (
                            <div
                                onMouseEnter={() => { }}
                                onClick={() => {
                                    registaJogada(i, j);
                                }}
                                className={styles.cell}
                                key={`${i}${j}`}
                                data-testid={`l${i}c${j}`}
                            >
                                {casa}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.status}>
                {verificarFimDoJogo(jogoDoGalo) ? (
                    <p data-testid="gameover">Jogo Terminado!</p>
                ) : (
                    <p>
                        <span data-testid="turn">{jogoDoGalo.jogadorAtual}, é a sua vez!</span>
                    </p>
                )}
                {vencedor && (
                    <p>
                        Vencedor: <span data-testid="winner">{vencedor}</span>
                    </p>
                )}
            </div>
            <button className={styles.botao} onClick={() => setJogoDoGalo(JOGO_INICIAL)} data-testid="restart">
                Reiniciar
            </button>
        </div>
    );
}