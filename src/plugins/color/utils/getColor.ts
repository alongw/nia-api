import tinycolor from 'tinycolor2'

import config from './../../../utils/config'

const { colors } = config.plugins_config.color

export const getColor = (color: string) => {
    if (!colors[color]) {
        return false
    }
    return colors[color]
}

export const generateGradient = (color: string) => {
    // 将传入的颜色转换为 HSL
    const hslColor = tinycolor(color).toHsl()

    // 定义渐变的起始、中间和结束位置的亮度
    const light1 = hslColor.l + 10
    const light2 = hslColor.l
    const light3 = hslColor.l - 10

    // 生成渐变的 CSS 字符串
    const gradient = `linear-gradient(150deg, hsl(${hslColor.h.toFixed(
        0
    )}, ${hslColor.s.toFixed(2)}%, ${light1.toFixed(2)}%) 15%, hsl(${hslColor.h.toFixed(
        0
    )}, ${hslColor.s.toFixed(2)}%, ${light2.toFixed(2)}%) 70%, hsl(${hslColor.h.toFixed(
        0
    )}, ${hslColor.s.toFixed(2)}%, ${light3.toFixed(2)}%) 94%)`

    // 返回渐变字符串
    return gradient
}

export const getAllColor = () => {
    return Object.keys(config.plugins_config.color.colors).map((key) => {
        return key
    })
}
