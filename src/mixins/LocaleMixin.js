import wepy from 'wepy'

export default class LocaleMixin extends wepy.mixin {
  data = {
    localeData: {},
    isLocaleDataLoaded: false
  }

  /** 直接传入locale的state */
  setLocaleData(localeState) {
    this.isLocaleDataLoaded = false
    if (localeState && localeState.locale) {
      const locale = localeState.locale
      const localeData = localeState.localeData[locale]
      if (localeData) {
        this.localeData = localeData.data
        this.isLocaleDataLoaded = true
        this.$apply()
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
            break
          case 'coop_stages':
            text = this.localeData.coop_stages[data.image].name
            break
          case 'gear':
            let gear = this.localeData.gear[data.id]
            if (!gear) {
              gear = this.localeData.gear[data.kind][data.id]
            }
            text = gear.name
        }
      } catch (e) {}
      if (text) {
        return text
      }
    }
    if (data.name) {
      return data.name
    }
    return ''
  }

  generateModeTitle(mode) {
    let modeName = ''
    switch (mode) {
      case 'regular':
        modeName = 'Regular Battle'
        break
      case 'gachi':
        modeName = 'Ranked Battle'
        break
      case 'league':
        modeName = 'League Battle'
        break
      case 'splatfest':
        modeName = 'Splatfest Battle'
        break
    }
    return this.getLocaleText('game_modes', {
      key: mode,
      name: modeName
    })
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

  generateSplatfestData(rawSplatfest) {
    if (rawSplatfest && rawSplatfest.festival_id) {
      return {
        ...rawSplatfest,
        special_stage: {
          ...rawSplatfest.special_stage,
          name: this.getLocaleText('stage', rawSplatfest.special_stage)
        }
      }
    }
    return rawSplatfest || {}
  }

  generateSalmonrunData(salmon) {
    if (salmon) {
      return {
        ...salmon,
        stage: {
          ...salmon.stage,
          name: this.getLocaleText('coop_stages', salmon.stage)
        }
      }
    }
    return salmon || {}
  }

  generateShopItemData(item) {
    if (item) {
      return {
        ...item,
        gear: {
          ...item.gear,
          name: this.getLocaleText('gear', item.gear)
        }
      }
    }
    return item || {}
  }
}
