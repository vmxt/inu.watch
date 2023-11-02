import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { animatedUno } from 'animated-unocss'

export default defineConfig({
  shortcuts: [
    {
      btn: 'py-2 px-4 font-semibold rounded-lg bg-dark-700 hover:bg-dark-500 hover:text-orange-200',
      watch_btn:
        'w-35 py-2 justify-center rounded-lg cursor-pointer bg-dark-700 hover:bg-dark-500 hover:text-orange-200'
    }
  ],
  presets: [presetUno(), presetAttributify(), presetIcons(), animatedUno()]
})
