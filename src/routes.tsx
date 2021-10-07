import React from 'react'
import { Switch, Route } from 'react-router'
import Home from './pages/Content/Home/Home'
import Extensions from './pages/Content/Extensions/Extensions'
import Extension from './pages/Content/Extension/Extension'
import Constructs from './pages/Content/Constructs/Constructs'
import Construct from './pages/Content/Constructs/Construct'
import FormReport from './pages/Content/Form/FormReport'
import FormExtension from './pages/Content/Form/FormExtension'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/extensions" component={Extensions} />
            <Route exact path="/extension" component={Extension} />
            <Route exact path="/constructs" component={Constructs} />
            <Route exact path="/construct" component={Construct} />
            <Route exact path="/extensions/report" component={FormReport} />
            <Route exact path="/extensions/new" component={FormExtension} />
        </Switch>
    )
}

export default Routes