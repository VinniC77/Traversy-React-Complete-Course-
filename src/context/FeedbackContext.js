import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from "react"

// O Context fornece uma maneira de passar props entre os componentes sem a necessidade de ficar passando essas props manualmente.

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
// Vamos construir um loading até que a API devolva os dados através do fetch para melhorar a UX
    const [isLoading, setIsLoading] = useState(true)


// Por enquanto, vamos passar esse item como padrão para entender como o Context funciona.
    const [feedback, setFeedback] = useState([])

// Aqui estamos montando montando o botão de editar e queremos que o item aqui receba o que quer que seja o feedback que estamos editando. A principio, o "editar" será falso e se tornará verdadeiro quando o botão for clicado.
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback() // Queremos usar a função quando a página carregar, por isso usamos a []
    }, [])

    // Fetch feedback - Aqui vamos construir uma função para buscar (FETCH) os dados de feedback
    const fetchFeedback = async () => {
        const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')
    // Utilizamos o sort (ORDENAR) para ordenar pelo ID de forma decrescente
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    

    const deleteFeedback = (id) => {
        // Agora vamos usar o setFeeback, porque o que vem como argumento dessa função agora, irá substituir o que temos em feedback. A ideia é, então, fazer com que o setFeedback receba todas as mensagens de feedback menos a que foi deletada, ou seja, menos a que foi passada como argumento da função deleteFeedback
        setFeedback(feedback.filter((item) => item.id !== id));
    
        // O filter irá passar por toda a array (de feedbacks) e filtrará (só irá trazer de volta) os itens que forem diferentes da id que foi passada na função deleteFeedback. Porque na função passamos o id que queremos deletar. E tudo isso é jogado de volta para o setFeedback que será mostrado para o usuário.
      };

      const updateFeedback = (id, updItem ) => { // receberemos qual é o id do item que estamos atualizando e o updItem será o novo item já atualizado.
        
// Aqui vamos querer retornar a nova array com o novo feedback atualizado. Pegaremos a atual array de feedback, chamaremos o map, chamaremos cada feedback de item e verificaremos se o id daquele item é igual ao id que está sendo passado (que queremos atualizar?), se sim, adicionaremos o mesmo no array através do spread operator, se não, apenas retornaremos o item  
         setFeedback(feedback.map((item) => item.id === id ? {
             ...item, ...updItem
         } : item))
      }

// A função abaixo vai atualizar o feedback quando estivermos editando ele
    const editFeedback = (item) => { // item para sabermos qual item esvamos editando
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback, // que é o mesmo que passar feedback: feedback
        feedbackEdit, // pedaço de estado que tem o edit e o boolean
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback, // função
        updateFeedback
    }}>
{/* E aqui passamos o feedback pelo value, porque é esse elemento que os outros componentes vão precisar acessar */}
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext