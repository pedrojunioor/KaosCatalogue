import './Form.scss'
import '../template-content.scss'
import Card from '../Layout/Card'
import { Button } from '../../../component/Button'

const FormExtension = () => {

    function submit(e){
        alert(e)
    }

    return (
        <div>
            <span className="title">KAOS extension registration form</span>
            <div className="main">

                <div className="form-input">
                    <form action="">
                        <label>Titulo</label>
                        <input
                            type="text"
                            placeholder="Digite o Titulo"
                        />
                        <label>Author</label>
                        <input
                            type="text"
                            placeholder="Author"
                        />
                        <label>Date Publication</label>
                        <input
                            type="text"
                            placeholder="DatePublication"
                        />
                        <div className="input-select">
                            <label for="cars">Aplication Area:</label>
                            <select name="aplicationarea" id="aplicationarea">
                                <option value="Area1">Area1</option>
                                <option value="Area2">Area2</option>
                                <option value="Area3">Area3</option>
                                <option value="Area4">Area4</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="input-select">
                            <label for="cars">Source</label>
                            <select name="source" id="source">
                                <option value="Journal">Journal</option>
                                <option value="Article">Article</option>
                                <option value="Periodic">Periodic</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <Button
                            type="submit"
                            onClick={submit}>
                            Cadastrar Extensão
                        </Button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default FormExtension