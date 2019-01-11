import wepy from 'wepy'

export default class LocaleMixin extends wepy.mixin {
  data = {
    localeData: {},
    isLocaleDataLoaded: false
  }

  /** 直接传入locale的state */
  setLocaleData(localeState) {
    this.isLocaleDataLoaded = false
    if (localeState) {
      const locale = localeState.locale
      const localeData = localeState.localeData[locale]
      if (localeData) {
        this.localeData = localeData.data
        this.isLocaleDataLoaded = true
        return
      }
    }
    this.localeData = {}
  }

  getLocaleText(type, data) {
    if (this.isLocaleDataLoaded) {
      let text = ''
      try {
        switch (type) {
          case 'stage':
            text = this.localeData.stages[data.id].name
            break
          case 'game_modes':
            text = this.localeData.game_modes[data.key].name
            break
          case 'rules':
            text = this.localeData.rules[data.key].name
        }
      } catch (e) {}
      if (text) {
        return text
      }
    }
    switch (type) {
      case 'stage':
        return data.name
      case 'game_modes':
        return data.name
      case 'rules':
        return data.name
    }
    return ''
  }

  generateBattleData(rawBattle) {
    if (rawBattle) {
      return {
        ...rawBattle,
        rule: {
          ...rawBattle.rule,
          name: this.getLocaleText('rules', rawBattle.rule)
        },
        stage_a: {
          ...rawBattle.stage_a,
          name: this.getLocaleText('stage', rawBattle.stage_a)
        },
        stage_b: {
          ...rawBattle.stage_b,
          name: this.getLocaleText('stage', rawBattle.stage_b)
        },
        game_mode: {
          ...rawBattle.game_mode,
          name: this.getLocaleText('game_modes', rawBattle.game_mode)
        }
      }
    }
    return {
      rule: {},
      stage_a: {},
      stage_b: {}
    }
  }
}