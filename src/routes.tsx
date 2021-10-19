import React from 'react'
import { Switch, Route } from 'react-router'
import Home from './pages/Content/Home/Home'
import Extensions from './pages/Content/Extensions/Extensions'
import Constructs from './pages/Content/Constructs/Constructs'
import ReportedExtension from './pages/Content/ReportedExtension/ReportedExtension'
import Extension from './pages/Content/Extension/Extension'
import FormReport from './pages/Content/Form/FormReport'
import FormExtension from './pages/Content/Form/FormExtension'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/extensions/new" component={FormExtension} />
            <Route exact path="/extension/:id" component={Extension} />
            <Route exact path="/extensions" component={Extensions} />
            <Route exact path="/constructs" component={Constructs} />
            <Route exact path="/extensions/report" component={FormReport} />
            <Route exact path="/reportedextensions" component={ReportedExtension} />
        </Switch>
    )
}

export default Routes