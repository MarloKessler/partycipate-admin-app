export const getBGColors = length => {
    const factor = 100/(length + 1)
    const bgColors      = []
    const hoverBGColors = []
    var i
    for (i = 1; i <= length; i++) {
        bgColors.push(`hsl(184, 31%, ${100 - i * factor}%)`)
        hoverBGColors.push(`hsl(184, 31%, ${100 - i * factor + 0.5 * factor}%)`)
    }
    return [bgColors, hoverBGColors]
} 