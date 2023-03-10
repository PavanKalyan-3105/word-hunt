import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Header from './Component/Header/Header';
import Definitions from './Component/Definitions/Definitions';

function App() {

  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");

  const dictionaryApi = async () => {

    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
      setMeanings(data.data);
    } 
    catch (error) {
      console.log(error);
    }
  };
  // console.log(meanings);

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line 
  }, [word, category]);
  

  return (
    <div className="App"
    style={{height:'100vh',backgroundColor:'#282c35',color:'white'}}>
      <Container maxWidth = 'md' 
      style={{display:'flex',flexDirection:'column',height:'100vh'}}>
        <Header category = {category} setCategory = {setCategory} word = {word} setWord = {setWord} />
        {meanings && (
        <Definitions word = {word} meanings = {meanings} category = {category} />
        )}
      </Container>
    </div>
  );
}

export default App;

