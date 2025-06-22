import React from 'react'
import { StyleSheet } from 'react-native'
import * as unistyles from '../web/services'
import { error, isServer } from '../web/utils'
import { serialize } from './serialize'
import { DefaultServerUnistylesSettings, type ServerUnistylesSettings } from './types'

export const getServerUnistyles = ({ includeRNWStyles = true, injectedStylesId = 'unistyles-web'  }: ServerUnistylesSettings = DefaultServerUnistylesSettings) => {
    if (!isServer()) {
        throw error('Server styles should only be read on the server')
    }

    // @ts-ignore
    const rnwStyle: string | null = includeRNWStyles ? (StyleSheet?.getSheet().textContent ?? '') : null
    const css = unistyles.services.registry.css.getStyles()
    const state = unistyles.services.registry.css.getState()

    return (
        <>
            {rnwStyle && <style id='rnw-style'>{rnwStyle}</style>}
            <style id={injectedStylesId}>{css}</style>
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Needs the json quotes to be unescaped */}
            <script id='unistyles-script' defer dangerouslySetInnerHTML={{ __html: `window.__UNISTYLES_STATE__ = ${serialize(state)}`}} />
        </>
    )
}
