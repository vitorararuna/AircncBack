import React, {useState} from 'react';
import api from '../../services/api'


export default function Login({ history }){ //history é usado para fazer navegação
    
    const [email, setEmail] = useState(''); //fiz desestrutração. O useState retorna um vetor com 2 posições e o setEmail serve para atualizarmos a variável email no estado
  
    async function handleSubmit(event){
    event.preventDefault(); //Estou fld: "formulário, previna o seu funcionamento padrão", assim ele não vai enviar o usuário para outra tela
   
    //Agora vamos fazer uma chamada à api:
    const response = await api.post('/sessions', {email} );  // deixei só email, pois o nome da chave = nome do valor, mas o convencional é: email: email
    //console.log(response); para ver como as informações estão chegando no meu insomnia

    const { _id } = response.data;      //preciso armazenar esse id em um lugar que esteja disponivel em toda aplicação, vou adicionar ele no localStorage = BD do nosso navegador
    localStorage.setItem('user', _id); //salvando esse id no Meu LocalStorage

    history.push('/Dashboard'); //navegação automática

  }
    
    return (
      <>  
        <p>
             Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa  
          </p>  

          <form onSubmit={handleSubmit}>
              <label htmlFor="email"> E-MAIL * </label>
              <input 
               type="email" 
               id="email" 
               placeholder="seu melhor e-mail"
               value={email} //para ter esse campo sempre atualizado
               onChange={event => setEmail(event.target.value)}  //toda vez que o usuário alterar o valor desse input, vamos receber um evento. E o valor desse input está em "event.target.value"
              />

              <button className="btn" type="submit">Entrar</button>
          </form>
      </>
    )
}

// "<> </>" é uma tag vazia que o react deixa a gente criar, para não ter uma div ao redor dela e não atrapalhar na estilização
//pois temos ao redor desse conteudo, lá no nosso App.js uma div com uma className que está estilizada.