import {StyleConfig} from '../src/lib/StyleConfig'

describe('slideIn', () => {
    it('simple', () => {
        let result = StyleConfig.slideIn(60,33)
        expect(result).toStrictEqual([{},{transform: "translateX(-28.94736842105263%)"}])
    })
})