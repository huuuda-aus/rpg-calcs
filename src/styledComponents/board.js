import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

export const BoardWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 15px;
`;

export const Board = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 48%;
    max-width: 48%;
    background: #ccc;
    padding: 10px;
`;

export const Stats = styled.div`
    background: #eee;
    border-radius: 8px;
    padding: 10px;
    
    dl {
        width: 25%;
        display: flex;
        flex-flow: row wrap;
        line-height: 2;

        dt {
            flex-basis: 80%;
            font-weight: bold;
        }
        dd {
            flex-basis: 20%;
            text-align: right;
        }
    }
`;

export const LogWrapper = styled.div`
    background: #ccc;
    margin: 15px;
    padding: 15px;

    button {
        margin: 10px;
        border: none;
        padding: 15px 35px;
        background: green;
        color: white;

        &:disabled {
            background: red;
        }
    }

    & > div:last-child {
        max-height: 300px;
        overflow-y: auto;
    }
    p {
        margin: 5px;
    }
`;
