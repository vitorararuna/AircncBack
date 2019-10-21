import React, {useState, useMemo} from 'react'; //useMemo para dar um preview na minha thumbnail quando eu for adicionar
import camera from '../../assets/camera.svg'
import './styles.css';
import api from '../../services/api'


export default function New({history}){

    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    
    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null; 
        },
        [thumbnail] /* qual variavel, quando alterada, fará o setThumbnail executar novamente*/ 
    ); 

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(); //pois não é em formato json que devo enviar os dados, mas sim em "multpart", lembra ?
        const user_id = localStorage.getItem('user'); //preciso pegar o id para a criação de um post, e a rota pede em seu header
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

         await api.post('/spots', data, {headers: {user_id} } )

         history.push('/dashboard'); //enviando o usuário de volta pra o dashboard
    }
    
    
    return (
        <form onSubmit={handleSubmit}>

             <label 
             id="thumbnail" 
             style={{backgroundImage: `url(${preview})`}}
             className={thumbnail? 'has-thumbnail' : ''}
             >
                 <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                 <img src={camera} alt="Select img"/>
             </label>

             <label htmlFor="company">EMPRESA *</label>
             <input 
              id="company"
              placeholder="Sua empresa incrível"
              value={company} //do meu state
              onChange={event => setCompany(event.target.value)}
             />

             <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
             <input 
              id="techs"
              placeholder="Quais tecnologias usam ?"
              value={techs} //do meu state
              onChange={event => setTechs(event.target.value)}
             />   

             <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco, caso gratuito)</span></label>
             <input 
              id="price"
              placeholder="Valor cobrado por dia"
              value={price} //do meu state
              onChange={event => setPrice(event.target.value)}
             />   

             <button type="submit" className="btn">Cadastrar</button>

        </form>

    )
}