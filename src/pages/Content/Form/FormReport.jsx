// import './FormReport.scss'
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button';
import { database } from '../../../services/firebase';
import './Form.scss';

const FormReport = () => {

    const history = useHistory()
    const { user, sigInWithGoogle } = useAuth()
    const [ titleState, setTitleState ] = useState('');
	const [ authorState, setAuthorState ] = useState('');
	const [ linkState, setLinkState ] = useState('');
    const [statusState,setStatusState] = useState('-');
    
    async function handleCreateExtension(event: FormEvent) {
		event.preventDefault();
		const extensionRef = database.ref('reportedextensions');
        if(user){
            await extensionRef.push({
                userName: user.emaill,
                title: titleState,
                author: authorState,
                link: linkState,
                status: statusState
              
            });
            history.push(`/`);
        }
        else{
            await sigInWithGoogle()
        }
	}

    return (
        <div className="root">
			<div className="main">
				<div className="form-input">
					<form onSubmit={handleCreateExtension}>
						<label>Titulo</label>
						<input
							type="text"
							placeholder="Digite o Titulo"
							onChange={(event) => setTitleState(event.target.value)}
							value={titleState}
						/>
						<label>Author</label>
						<input
							type="text"
							placeholder="Author"
							onChange={(event) => setAuthorState(event.target.value)}
							value={authorState}
						/>
						<label>Link</label>
						<input
							type="text"
							placeholder="Enter the link to access the extension"
							onChange={(event) => setLinkState(event.target.value)}
							value={linkState}
						/>
                        <div className="button-submit">
                            <Button type="submit">Report</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormReport