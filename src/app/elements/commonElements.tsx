import React from 'react';
import styled from 'styled-components';
import {WhenConnected} from '../mobile';


const SourceLink=styled.a.attrs({
    href:'https://github.com/global-input/mobile-encryption',
    rel:'noreferrer noopener',
    target:'_blank'})`
    color: #153E85;
    font-weight: 100;
    font-family: Georgia, Times, Serif;
    font-size: 0.8em;
    @media screen and (min-height:200px){
        font-size:1em;
        margin-bottom:10px;
    }
    @media screen and (min-height:400px){
        font-size:1.5em;
    }
   @media print{
       display:none;
   }
    `;



const AppTitle=styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    font-size: 1em;
    color: #445566;
    font-family: Georgia, Times, Serif;
    @media screen and (min-height:200px){
        font-size:1.5em;
    }

    @media screen and (min-height:400px){
        font-size:2em;
        margin-bottom:10px;
    }
    @media print{
        display:none;
    }
},`;


const Container =styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100vh;
    width:100%;
    backgroundColor: rgb(219,240,240);


`;

const Content=styled.div`
    width:95%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    align-items: center;
    padding:10px;

`;






export  const AppContainer:React.FC=({children})=>(
    <Container>
        <Content>
            <AppTitle>Mobile Encryption</AppTitle>
            <SourceLink>Source Code</SourceLink>
            {children}
        </Content>
        </Container>
);

export const Title=styled(AppTitle)`
    color: #445566;
    justify-content: flex-start;
`;





export const MoreInfo = styled.div`
    font-size: 16px;
    align-self:flex-start;
    @media screen and (min-height:310px){
         margin-bottom:10px;

    }
`;

const Instruction=styled.div`
    font-size: 10px;
    align-self:flex-start;
    @media screen and (min-height:250px){
        font-size: 16px;
    }
    @media screen and (min-height:380px){
        font-size: 16px;
        margin-bottom:10px;
    }

`;





export const ConnectedInstruction=({children, mobile})=>(

<WhenConnected mobile={mobile}>
                <Instruction>
                    {children}
                </Instruction>
            </WhenConnected>

);


export const Error = styled.div`
        color: red;
        font-size: 11;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        max-width:  350px;
        max-height: 100px;
        overflow: scroll;
`;
