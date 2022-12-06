import { useState } from "react";
import Input from "../components/Input/input";
import Button from "../components/Button/button";
import ItemRepo from "../components/ItemRepo/index";
import { Container } from "./styles";
import { api } from "../services/api";

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRespos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`)

    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id)

      if (!isExist) {
        setRespos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
    }
    alert('Repositorio não encontrado')
  }

  const handleRemoveRepo = (id) => {
    
  }

  return (
    <Container >
      <img src="https://raphaelbrodrigues.github.io/images/git.png" width={72} height={72} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
