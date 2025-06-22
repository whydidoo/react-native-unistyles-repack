import * as unistyles from '../web/services'

type Params = Parameters<typeof unistyles.services.registry.css.setInjectedStylesId>

export const setUnistylesStyleTagId = (...args: Params) => unistyles.services.registry.css.setInjectedStylesId(...args)
