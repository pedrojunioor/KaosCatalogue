// import '../template-content.scss'
import React, { useState, FormEvent } from 'react';
// import { FormEvent } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../component/Button';
import { database } from '../../../services/firebase';
import './Form.scss';

const FormExtension = () => {
	const history = useHistory();
	const { user, sigInWithGoogle } = useAuth();

	const [ titleState, setTitleState ] = useState('');
	const [ authorState, setAuthorState ] = useState('');
	const [ datePublicationState, setDatePublicationState ] = useState('');
	const [ sourceState, setSourceState ] = useState('');
	const [ sourceLocationState, setSourceLocationState ] = useState('');
	const [ extensionDerivativeState, setExtensionDerivativeState ] = useState('');
	const [ extensionBaseState, setExtensionBaseState ] = useState('');
	const [ validationFormState, setValidationFormState ] = useState('');
	const [ applicationAreaState, setApplicationAreaState ] = useState('');
	const [ definitionofConceptsState, setDefinitionofConceptsState ] = useState('');
	const [ syntaxLevelState, setSyntaxLevelState ] = useState('');
	const [ metamodelCompletenessState, setMetamodelCompletenessState ] = useState('');
	const [ toolSupportState, setToolSupportState ] = useState('');

	async function handleCreateExtension(event: FormEvent) {
		event.preventDefault();

		const extensionRef = database.ref('extensions');
		console.log('REF', extensionRef);
		const firebaseExtension = await extensionRef.push({
			userId: user.id,
			title: titleState,
			author: authorState,
			datePublication: datePublicationState,
			source: sourceState,
			sourceLocation: sourceLocationState,
			extensionDerivative: extensionDerivativeState,
			extensionBase: extensionBaseState,
			validationForm: validationFormState,
			applicationArea: applicationAreaState,
			metamodelcompleteness: metamodelCompletenessState,
			syntaxlevel: syntaxLevelState,
			toolsuport: toolSupportState,
			definitionofconcepts: definitionofConceptsState
		});

		history.push(`/extension/${firebaseExtension.key}`);
	}

	return (
		<div>
			<span className="title">KAOS extension registration form</span>
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
						<label>Date Publication</label>
						<input
							type="text"
							placeholder="DatePublication"
							onChange={(event) => setDatePublicationState(event.target.value)}
							value={datePublicationState}
						/>

						<label>Source Location</label>
						<input
							type="text"
							placeholder="SourceLocation"
							onChange={(event) => setSourceLocationState(event.target.value)}
							value={sourceLocationState}
						/>
						<div className="selects">
							<div className="input-select">
								<label>Source</label>
								<select value={sourceState} onChange={(event) => setSourceState(event.target.value)}>
									<option value="Journal">Journal</option>
									<option value="Conference">Conference</option>
									<option value="Workshop">Workshop</option>
									<option value="Others">Others</option>
								</select>
							</div>
							<div className="input-select">
								<label>Form Validation</label>
								<select
									value={validationFormState}
									onChange={(event) => setValidationFormState(event.target.value)}
								>
									<option value="casestudy">Case Study</option>
									<option value="experiment">Experiment</option>
									<option value="exampleofuse">Example of use</option>
									<option value="quiz">Quiz</option>
									<option value="notpresentedevaluation">Not presented evaluation</option>
								</select>
							</div>
							<div className="input-select">
								<label>Application Area:</label>
								<select
									value={applicationAreaState}
									onChange={(event) => setApplicationAreaState(event.target.value)}
								>
									<option value="Adaptive Systems">Adaptive Systems</option>
									<option value="webservices">Web Services</option>
									<option value="aspects">Aspects</option>
									<option value="risks">Risks</option>
									<option value="safety">Safety</option>
									<option value="autonomicsystems">Autonomic Systems</option>
									<option value="organizational-businessprocess">
										Organizational/Business Process
									</option>
									<option value="security-privacy-vulnerability">
										Security/Privacy/Vulnerability
									</option>
									<option value="businesscontinuity">Business continuity</option>
									<option value="escalabilidade">Escalabilidade</option>
									<option value="ambientsystems">Ambient Systems</option>
									<option value="Others">Others</option>
								</select>
							</div>

							<div className="input-select">
								<label>Metamodel Completeness:</label>
								<select
									value={metamodelCompletenessState}
									onChange={(event) => setMetamodelCompletenessState(event.target.value)}
								>
									<option value="complete">Complete</option>
									<option value="absentnodes">Absent Nodes</option>
									<option value="missinglinks">Missing links</option>
									<option value="missingnodesandlinks">Missing nodes and links</option>
								</select>
							</div>

							<div className="input-select">
								<label>Syntax level:</label>
								<select
									value={syntaxLevelState}
									onChange={(event) => setSyntaxLevelState(event.target.value)}
								>
									<option value="abstractsyntax">Abstract Syntax</option>
									<option value="concretesyntax">Concrete Syntax</option>
									<option value="both">Both</option>
								</select>
							</div>

							<div className="input-select">
								<label>Definition of Concepts:</label>
								<select
									value={definitionofConceptsState}
									onChange={(event) => setDefinitionofConceptsState(event.target.value)}
								>
									<option value="Features definition">Features definition</option>
									<option value="Partially presents definition">Partially presents definition</option>
								</select>
							</div>

							<div className="input-select">
								<label>Is there tool support:</label>
								<select
									value={toolSupportState}
									onChange={(event) => setToolSupportState(event.target.value)}
								>
									<option value="yes">Yes</option>
									<option value="not">Not</option>
								</select>
							</div>
							<div className="input-select">
								<label>Extension Derivative</label>
								<select
									value={extensionDerivativeState}
									onChange={(event) => setExtensionDerivativeState(event.target.value)}
								>
									<option value="yes">Yes</option>
									<option value="not">Not</option>
								</select>
							</div>
						</div>
						{extensionDerivativeState === 'yes' && (
							<div>
								<label>Base Extension</label>
								<input
									type="text"
									placeholder="Base Extension"
									onChange={(event) => setExtensionBaseState(event.target.value)}
									value={extensionBaseState}
								/>
							</div>
						)}

						<Button type="submit">Cadastrar Extensão</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FormExtension;
