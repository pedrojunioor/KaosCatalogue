// import '../template-content.scss'
import React, { useState, FormEvent } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../component/Button';
import { database } from '../../../services/firebase';
import './Form.scss';

type Iprops = {
    data: any,
    idExtension: string
}

const FormExtensionEdit = Iprops => { 

    const extensionEdit = Iprops.data;
    const extensionId = Iprops.idExtension;
	const { user } = useAuth()
    const history = useHistory()
 
	const [ titleState, setTitleState ] = useState(extensionEdit.title);
	const [ authorState, setAuthorState ] = useState(extensionEdit.author);
	const [ datePublicationState, setDatePublicationState ] = useState(extensionEdit.datePublication);
    const [ linkState, setLinkState ] = useState(extensionEdit.link);
	const [ sourceState, setSourceState ] = useState(extensionEdit.source);
	const [ validationFormState, setValidationFormState ] = useState(extensionEdit.validationForm);
	const [ applicationAreaState, setApplicationAreaState ] = useState(extensionEdit.applicationArea);
	const [ metamodelCompletenessState, setMetamodelCompletenessState ] = useState(extensionEdit.metamodelcompleteness);
	const [ sourceLocationState, setSourceLocationState ] = useState(extensionEdit.sourceLocation);
	const [ extensionDerivativeState, setExtensionDerivativeState ] = useState(extensionEdit.extensionDerivative);
	const [ extensionBaseState, setExtensionBaseState ] = useState(extensionEdit.extensionBase);
	const [ definitionofConceptsState, setDefinitionofConceptsState ] = useState(extensionEdit.definitionofconcepts);
	const [ syntaxLevelState, setSyntaxLevelState ] = useState(extensionEdit.syntaxlevel);
	const [ toolSupportState, setToolSupportState ] = useState(extensionEdit.toolsuport);

	async function handleEditExtension(event: FormEvent) {
		// event.preventDefault();

		const extensionRef = database.ref(`extensions/${extensionId}`);
		
		const firebaseExtension = await extensionRef.update({
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
			definitionofconcepts: definitionofConceptsState,
            link: linkState
		});

		history.push(`/extension/${extensionId}`);


	}

	return (
		<div className="root">
			<div className="main">
				<div className="form-input">
					<form onSubmit={handleEditExtension}>
						<label>Titulo</label>
						<input
							type="text"
							placeholder="Enter the title"
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
							placeholder="Date Publication"
							onChange={(event) => setDatePublicationState(event.target.value)}
							value={datePublicationState}
						/>
                        <label>Link</label>
						<input
							type="text"
							placeholder="Link"
							onChange={(event) => setLinkState(event.target.value)}
							value={linkState}
						/>

						<label>Source Location</label>
						<input
							type="text"
							placeholder="Source Location"
							onChange={(event) => setSourceLocationState(event.target.value)}
							value={sourceLocationState}
						/>
						<div className="selects">
							<div className="input-select">
								<label>Source</label>
								<select value={sourceState} onChange={(event) => setSourceState(event.target.value)}>
									<option value="journal">Journal</option>
									<option value="conference">Conference</option>
									<option value="workshop">Workshop</option>
									<option value="others">Others</option>
								</select>
							</div>
							<div className="input-select">
								<label>Form Validation</label>
								<select
									value={validationFormState}
									onChange={(event) => setValidationFormState(event.target.value)}
								>
									<option value="case-study">Case Study</option>
									<option value="experiment">Experiment</option>
									<option value="example-of-use">Example of use</option>
									<option value="quiz">Quiz</option>
                                    <option value="Qualitative Analysis">Qualitative Analysis</option>
                                    <option value="Survey">Survey</option>
									<option value="not-presentede-valuation">Not presented evaluation</option>
								</select>
							</div>
							<div className="input-select">
								<label>Application Area:</label>
								<select
									value={applicationAreaState}
									onChange={(event) => setApplicationAreaState(event.target.value)}
								>
                                    <option value="">-</option>
									<option value="Adaptive Systems">Adaptive Systems</option>
									<option value="Web Services">Web Services</option>
									<option value="aspects">Aspects</option>
									<option value="risks">Risks</option>
									<option value="safety">Safety</option>
									<option value="autonomic-systems">Autonomic Systems</option>
									<option value="organizational-business-process">
										Organizational/Business Process
									</option>
									<option value="security-privacy-vulnerability">
										Security/Privacy/Vulnerability
									</option>
									<option value="business-continuity">Business continuity</option>
									<option value="escalabilidade">Escalabilidade</option>
									<option value="ambient-systems">Ambient Systems</option>
									<option value="others">Others</option>
								</select>
							</div>

							<div className="input-select">
								<label>Metamodel Completeness:</label>
								<select
									value={metamodelCompletenessState}
									onChange={(event) => setMetamodelCompletenessState(event.target.value)}
								>
									<option value="">-</option>
									<option value="complete">Complete</option>
									<option value="missing-nodes">Missing Nodes</option>
									<option value="missing-links">Missing links</option>
									<option value="missing-nodes-and-links">Missing nodes and links</option>
								</select>
							</div>

							<div className="input-select">
								<label>Syntax level:</label>
								<select	value={syntaxLevelState}onChange={(event) => setSyntaxLevelState(event.target.value)}>
                                    <option value="">-</option>
									<option value="abstract-syntax">Abstract Syntax</option>
									<option value="concrete-syntax">Concrete Syntax</option>
									<option value="concrete-and-abstract">Both (Concrete and Abstract)</option>
								</select>
							</div>

							<div className="input-select">
								<label>Definition of Concepts:</label>
								<select
									value={definitionofConceptsState}
									onChange={(event) => setDefinitionofConceptsState(event.target.value)}
								>
									<option value="Definition is Presented">Definition is Presented</option>
									<option value="Partially Presented">Partially Presented</option>
                                    <option value="Not Presented">Not Presented</option>
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
						<div className="button-submit">
							<Button type="submit">Update</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FormExtensionEdit;
