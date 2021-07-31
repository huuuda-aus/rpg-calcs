import { useState } from 'react';
import * as S from './styledComponents/board';

const TestBoard = () => {
    let [messages, addMessage] = useState([]);
    const [isReady, setIsReady] = useState(true);
    const [attackCount, increaseAttackCount] = useState(0);

    let player = {
        strength: 60,
        accuracy: 90,
        agility: 80,
        stamina: 100,
        maxEnergy: 100,
        endurance: 80,
        critChance: 50,
    };

    let enemy = {
        strength: 90,
        accuracy: 70,
        agility: 60,
        stamina: 120,
        maxEnergy: 100,
        endurance: 150,
        critChance: 25,
    };

    let playerHP = player.endurance + (player.endurance * player.strength / 100);
    let enemyHP = player.endurance + (player.endurance * player.strength / 100);

    const attacks = [
        {
            id: 0,
            name: 'punch',
            power: 10,
            energy: -5,
            speed: 10,
            cooldown: 100,
        },{
            id: 1,
            name: 'kick',
            power: 35,
            energy: -20,
            speed: 5,
            cooldown: 150,
        },{
            id: 2,
            name: 'roundhouse kick',
            power: 50,
            energy: -30,
            speed: 3,
            cooldown: 200,
        }
    ];

    function performAttack(aid) {
        let att = attacks[aid];
        messages.length = 0;
        increaseAttackCount(attackCount + 1);
        addMessage(messages => [...messages, `[${attackCount}] Player uses ${att.name}`]);
        setIsReady(false);
        setTimeout(() => { setIsReady(true)}, att.cooldown);
        let hit = Math.floor(Math.random() * 100);
        let hits = (player.accuracy + player.agility) / 2 > hit;
        addMessage(messages => [...messages, `...player hits: ${hits}`]);
        if (hit < player.accuracy) {
            let dodge = Math.floor(Math.random() * enemy.agility);
            addMessage(messages => [...messages, `...enemy dodges: ${hit <= dodge}`]);
            if (hit > dodge) {
                let power = att.power * (player.strength / 100) - (200 - enemy.endurance) / 100;
                let critHit = Math.floor(Math.random() * 100);
                addMessage(messages => [...messages, ` ... critical? ${critHit <= player.critChance}`]);
                if (critHit <= player.critChance) {
                    addMessage(messages => [...messages, `Enemy critically hit!`]);
                    power = power * 1.25;
                } else {
                    addMessage(messages => [...messages, `Enemy hit!`]);
                }
                addMessage(messages => [...messages, ` ...hit power: ${power}`]);
                
            } else {
                addMessage(messages => [...messages, `Enemy dodged the attack!`]);
            }
        } else {
            addMessage(messages => [...messages, `Player misses!`]);
        }
    }

    function showStats(obj) {
        return (
            <dl>
                <dt>HP:</dt><dd>{obj === player ? playerHP : enemyHP}</dd>
                <dt>STA:</dt><dd>{obj.stamina}</dd>
                <dt>STR:</dt><dd>{obj.strength}</dd>
                <dt>AGI:</dt><dd>{obj.agility}</dd>
                <dt>ACC:</dt><dd>{obj.accuracy}</dd>
                <dt>DEF:</dt><dd>{obj.endurance}</dd>
            </dl>
        );
    }

    return (
        <S.Wrapper>
            <S.BoardWrapper>
                <S.Board>
                    <S.Stats>{showStats(player)}</S.Stats>
                </S.Board>
                <S.Board>
                    <S.Stats>{showStats(enemy)}</S.Stats>
                </S.Board>
            </S.BoardWrapper>
            <S.LogWrapper>
                <div>{attacks.map((a,i) => <button key={`att_${a.id}`} disabled={!isReady} onClick={() => performAttack(i)}>{a.name}</button>)}</div>
                <hr />
                <div>{messages.map((m,i) => <p key={`${i}_${m}`}>{m}</p>)}</div>
            </S.LogWrapper>
        </S.Wrapper>
    );
};

export default TestBoard;