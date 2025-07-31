(function(Scratch) {
    'use strict'

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('Playgama Bridge requires unsandboxed mode to work')
    }

    const ID = 'playgamabridge'
    const SDK_URL = 'https://bridge.playgama.com/v1.24.0/playgama-bridge.js'
    const ICON = 'data:image/jpeg;base64,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'

    class PlaygamaBridge {

        getInfo() {
            return {
                id: ID,
                name: 'Playgama Bridge',
                docsURI: 'https://wiki.playgama.com/playgama/sdk/engines/scratch',
                blockIconURI: ICON,
                menuIconURI: ICON,
                color1: '#9747FF',
                blocks: [
                    // common
                    {
                        opcode: 'initialize',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'initialize'
                    },
                    {
                        opcode: 'isInitialized',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is initialized?'
                    },
                    {
                        opcode: 'whenInitialized',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when initialized',
                        isEdgeActivated: false
                    },

                    // platform
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Platform'
                    },
                    {
                        opcode: 'platformSendMessage',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'send message [MESSAGE] to platform',
                        arguments: {
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'PLATFORM_MESSAGE'
                            }
                        }
                    },
                    {
                        opcode: 'platformId',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'platform id'
                    },
                    {
                        opcode: 'platformLanguage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'platform language'
                    },
                    {
                        opcode: 'platformPayload',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'platform payload'
                    },
                    {
                        opcode: 'platformTld',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'platform TLD'
                    },
                    {
                        opcode: 'platformIsAudioEnabled',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is platform audio enabled?'
                    },
                    {
                        opcode: 'platformIsPaused',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is platform paused?'
                    },
                    {
                        opcode: 'platformWhenAudioEnabled',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when platform audio enabled',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'platformWhenAudioDisabled',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when platform audio disabled',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'platformWhenPaused',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when platform paused',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'platformWhenResumed',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when platform resumed',
                        isEdgeActivated: false
                    },

                    // game
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Game'
                    },
                    {
                        opcode: 'gameVisibilityState',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'game visibility state'
                    },
                    {
                        opcode: 'gameVisibilityStateIsVisible',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'game is visible?'
                    },
                    {
                        opcode: 'gameVisibilityStateIsHidden',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'game is hidden?'
                    },
                    {
                        opcode: 'gameWhenVisibilityStateVisible',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when game visible',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'gameWhenVisibilityStateHidden',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when game hidden',
                        isEdgeActivated: false
                    },

                    // device
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Device'
                    },
                    {
                        opcode: 'deviceType',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'device type'
                    },
                    {
                        opcode: 'deviceTypeIsDesktop',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is device type = desktop?'
                    },
                    {
                        opcode: 'deviceTypeIsMobile',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is device type = mobile?'
                    },
                    {
                        opcode: 'deviceTypeIsTablet',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is device type = tablet?'
                    },
                    {
                        opcode: 'deviceTypeIsTV',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is device type = TV?'
                    },

                    // storage
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Storage'
                    },
                    {
                        opcode: 'storageDefaultType',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'storage default type'
                    },
                    {
                        opcode: 'storageIsLocalStorageSupported',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is local storage supported?',
                    },
                    {
                        opcode: 'storageIsPlatformInternalSupported',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is platform internal storage supported?',
                    },
                    {
                        opcode: 'storageIsLocalStorageAvailable',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is local storage available?',
                    },
                    {
                        opcode: 'storageIsPlatformInternalAvailable',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is platform internal storage available?',
                    },
                    '---',
                    {
                        opcode: 'storageGet',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'storage get key [KEY] from [STORAGE_TYPE]',
                        disableMonitor: true,
                        arguments: {
                            KEY: {
                                type: Scratch.ArgumentType.STRING
                            },
                            STORAGE_TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'STORAGE_TYPE'
                            }
                        }
                    },
                    {
                        opcode: 'storageSet',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'storage set key [KEY] value [VALUE] to [STORAGE_TYPE]',
                        arguments: {
                            KEY: {
                                type: Scratch.ArgumentType.STRING
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING
                            },
                            STORAGE_TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'STORAGE_TYPE'
                            }
                        }
                    },
                    {
                        opcode: 'storageDelete',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'storage delete key [KEY] from [STORAGE_TYPE]',
                        arguments: {
                            KEY: {
                                type: Scratch.ArgumentType.STRING
                            },
                            STORAGE_TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'STORAGE_TYPE'
                            }
                        }
                    },

                    // advertisement
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Advertisement'
                    },
                    {
                        opcode: 'advertisementIsInterstitialSupported',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is interstitial supported?',
                    },
                    {
                        opcode: 'advertisementShowInterstitial',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'show interstitial placement [PLACEMENT]',
                        arguments: {
                            PLACEMENT: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'advertisementInterstitialState',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'interstitial state',
                    },
                    {
                        opcode: 'advertisementIsInterstitialStateLoading',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is interstitial loading?'
                    },
                    {
                        opcode: 'advertisementIsInterstitialStateOpened',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is interstitial opened?'
                    },
                    {
                        opcode: 'advertisementIsInterstitialStateFailed',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is interstitial failed?'
                    },
                    {
                        opcode: 'advertisementIsInterstitialStateClosed',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is interstitial closed?'
                    },
                    {
                        opcode: 'advertisementWhenInterstitialStateLoading',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when interstitial loading',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenInterstitialStateOpened',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when interstitial opened',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenInterstitialStateFailed',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when interstitial failed',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenInterstitialStateClosed',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when interstitial closed',
                        isEdgeActivated: false
                    },
                    '---',
                    {
                        opcode: 'advertisementIsRewardedSupported',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is rewarded supported?',
                    },
                    {
                        opcode: 'advertisementShowRewarded',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'show rewarded placement [PLACEMENT]',
                        arguments: {
                            PLACEMENT: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'advertisementRewardedState',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'rewarded state',
                    },
                    {
                        opcode: 'advertisementIsRewardedStateLoading',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is rewarded loading?'
                    },
                    {
                        opcode: 'advertisementIsRewardedStateOpened',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is rewarded opened?'
                    },
                    {
                        opcode: 'advertisementIsRewardedStateRewarded',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is rewarded rewarded?'
                    },
                    {
                        opcode: 'advertisementIsRewardedStateFailed',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is rewarded failed?'
                    },
                    {
                        opcode: 'advertisementIsRewardedStateClosed',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is rewarded closed?'
                    },
                    {
                        opcode: 'advertisementWhenRewardedStateLoading',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when rewarded loading',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenRewardedStateOpened',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when rewarded opened',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenRewardedStateRewarded',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when rewarded rewarded',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenRewardedStateFailed',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when rewarded failed',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenRewardedStateClosed',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when rewarded closed',
                        isEdgeActivated: false
                    },
                    '---',
                    {
                        opcode: 'advertisementIsBannerSupported',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is banner supported?',
                    },
                    {
                        opcode: 'advertisementShowBanner',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'show banner, position [POSITION], placement [PLACEMENT]',
                        arguments: {
                            POSITION: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'BANNER_POSITION'
                            },
                            PLACEMENT: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'advertisementHideBanner',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'hide banner'
                    },
                    {
                        opcode: 'advertisementBannerState',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'banner state',
                    },
                    {
                        opcode: 'advertisementIsBannerStateLoading',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is banner loading?'
                    },
                    {
                        opcode: 'advertisementIsBannerStateShown',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is banner shown?'
                    },
                    {
                        opcode: 'advertisementIsBannerStateFailed',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is banner failed?'
                    },
                    {
                        opcode: 'advertisementIsBannerStateHidden',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is banner hidden?'
                    },
                    {
                        opcode: 'advertisementWhenBannerStateLoading',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when banner loading',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenBannerStateShown',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when banner shown',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenBannerStateFailed',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when banner failed',
                        isEdgeActivated: false
                    },
                    {
                        opcode: 'advertisementWhenBannerStateHidden',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when banner hidden',
                        isEdgeActivated: false
                    },
                ],
                menus: {
                    PLATFORM_MESSAGE: {
                        acceptReporters: true,
                        items: [
                            'game_ready',
                            'in_game_loading_started',
                            'in_game_loading_stopped',
                            'gameplay_started',
                            'gameplay_stopped',
                            'player_got_achievement'
                        ]
                    },
                    STORAGE_TYPE: {
                        acceptReporters: true,
                        items: [
                            'default',
                            'local_storage',
                            'platform_internal'
                        ]
                    },
                    BANNER_POSITION: {
                        acceptReporters: true,
                        items: [
                            'bottom',
                            'top'
                        ]
                    }
                }
            }
        }


        // common
        initialize() {
            if (window.bridge) {
                return Promise.resolve()
            }

            return new Promise(resolve => {
                const script = document.createElement('script')
                script.src = SDK_URL
                document.head.appendChild(script)

                script.onload = () => {
                    window.bridge.initialize({ disableLoadingLogo: true })
                        .finally(() => {
                            this._fireEvent('whenInitialized')
                            resolve()

                            window.bridge.game.on('visibility_state_changed', (state) => {
                                switch (state) {
                                    case 'visible':
                                        this._fireEvent('gameWhenVisibilityStateVisible')
                                        break
                                    case 'hidden':
                                        this._fireEvent('gameWhenVisibilityStateHidden')
                                        break
                                }
                            })

                            window.bridge.advertisement.on('interstitial_state_changed', (state) => {
                                switch (state) {
                                    case 'loading':
                                        this._fireEvent('advertisementWhenInterstitialStateLoading')
                                        break
                                    case 'opened':
                                        this._fireEvent('advertisementWhenInterstitialStateOpened')
                                        break
                                    case 'failed':
                                        this._fireEvent('advertisementWhenInterstitialStateFailed')
                                        break
                                    case 'closed':
                                        this._fireEvent('advertisementWhenInterstitialStateClosed')
                                        break
                                }
                            })

                            window.bridge.advertisement.on('rewarded_state_changed', (state) => {
                                switch (state) {
                                    case 'loading':
                                        this._fireEvent('advertisementWhenRewardedStateLoading')
                                        break
                                    case 'opened':
                                        this._fireEvent('advertisementWhenRewardedStateOpened')
                                        break
                                    case 'rewarded':
                                        this._fireEvent('advertisementWhenRewardedStateRewarded')
                                        break
                                    case 'failed':
                                        this._fireEvent('advertisementWhenRewardedStateFailed')
                                        break
                                    case 'closed':
                                        this._fireEvent('advertisementWhenRewardedStateClosed')
                                        break
                                }
                            })

                            window.bridge.advertisement.on('banner_state_changed', (state) => {
                                switch (state) {
                                    case 'loading':
                                        this._fireEvent('advertisementWhenBannerStateLoading')
                                        break
                                    case 'shown':
                                        this._fireEvent('advertisementWhenBannerStateShown')
                                        break
                                    case 'failed':
                                        this._fireEvent('advertisementWhenBannerStateFailed')
                                        break
                                    case 'hidden':
                                        this._fireEvent('advertisementWhenBannerStateHidden')
                                        break
                                }
                            })

                            window.bridge.platform.on('audio_state_changed', (isEnabled) => {
                                if (isEnabled) {
                                    this._fireEvent('platformWhenAudioEnabled')
                                } else {
                                    this._fireEvent('platformWhenAudioDisabled')
                                }
                            })

                            window.bridge.platform.on('paused_state_changed', (isPaused) => {
                                if (isPaused) {
                                    this._fireEvent('platformWhenPaused')
                                } else {
                                    this._fireEvent('platformWhenResumed')
                                }
                            })
                        })
                }

                script.onerror = function() {
                    resolve()
                }
            })
        }

        isInitialized() {
            if (!window.bridge) {
                return false
            }

            return window.bridge.isInitialized
        }


        // platform
        platformSendMessage(args) {
            if (!this._canUseBridge()) {
                return
            }

            return window.bridge.platform.sendMessage(args.MESSAGE)
        }

        platformId() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.platform.id
        }

        platformLanguage() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.platform.language
        }

        platformTld() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.platform.tld
        }

        platformPayload() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.platform.payload
        }

        platformIsAudioEnabled() {
            if (!this._canUseBridge()) {
                return false
            }

            return window.bridge.platform.isAudioEnabled
        }

        platformIsPaused() {
            if (!this._canUseBridge()) {
                return false
            }

            return window.bridge.platform.isPaused
        }


        // game
        gameVisibilityState() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.game.visibilityState
        }

        gameVisibilityStateIsVisible() {
            return this.gameVisibilityState() === 'visible'
        }

        gameVisibilityStateIsHidden() {
            return this.gameVisibilityState() === 'hidden'
        }


        // device
        deviceType() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.device.type
        }

        deviceTypeIsDesktop() {
            return this.deviceType() === 'desktop'
        }

        deviceTypeIsMobile() {
            return this.deviceType() === 'mobile'
        }

        deviceTypeIsTablet() {
            return this.deviceType() === 'tablet'
        }

        deviceTypeIsTV() {
            return this.deviceType() === 'tv'
        }


        // storage
        storageDefaultType() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.storage.defaultType
        }

        storageIsLocalStorageAvailable() {
            if (!this._canUseBridge()) {
                return false
            }

            return window.bridge.storage.isAvailable('local_storage')
        }

        storageIsLocalStorageSupported() {
            if (!this._canUseBridge()) {
                return false
            }

            return window.bridge.storage.isSupported('local_storage')
        }

        storageIsPlatformInternalAvailable() {
            if (!this._canUseBridge()) {
                return false
            }

            return window.bridge.storage.isAvailable('platform_internal')
        }

        storageIsPlatformInternalSupported() {
            if (!this._canUseBridge()) {
                return false
            }

            return window.bridge.storage.isSupported('platform_internal')
        }

        storageSet(args) {
            if (!this._canUseBridge()) {
                return Promise.reject()
            }

            if (args.STORAGE_TYPE === 'default') {
                return window.bridge.storage.set(args.KEY, args.VALUE)
            }

            return window.bridge.storage.set(args.KEY, args.VALUE, args.STORAGE_TYPE)
        }

        storageGet(args) {
            if (!this._canUseBridge()) {
                return Promise.reject()
            }

            if (args.STORAGE_TYPE === 'default') {
                return window.bridge.storage.get(args.KEY)
            }

            return window.bridge.storage.get(args.KEY, args.STORAGE_TYPE)
        }

        storageDelete(args) {
            if (!this._canUseBridge()) {
                return Promise.reject()
            }

            if (args.STORAGE_TYPE === 'default') {
                return window.bridge.storage.delete(args.KEY)
            }

            window.bridge.storage.delete(args.KEY, args.STORAGE_TYPE)
        }


        // advertisement
        advertisementShowInterstitial(args) {
            if (!this._canUseBridge()) {
                return
            }

            window.bridge.advertisement.showInterstitial(args.PLACEMENT)
        }

        advertisementInterstitialState() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.advertisement.interstitialState
        }

        advertisementIsInterstitialStateLoading() {
            return this.advertisementInterstitialState() === 'loading'
        }

        advertisementIsInterstitialStateOpened() {
            return this.advertisementInterstitialState() === 'opened'
        }

        advertisementIsInterstitialStateFailed() {
            return this.advertisementInterstitialState() === 'failed'
        }

        advertisementIsInterstitialStateClosed() {
            return this.advertisementInterstitialState() === 'closed'
        }


        advertisementShowRewarded(args) {
            if (!this._canUseBridge()) {
                return
            }

            window.bridge.advertisement.showRewarded(args.PLACEMENT)
        }

        advertisementRewardedState() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.advertisement.rewardedState
        }

        advertisementIsRewardedStateLoading() {
            return this.advertisementRewardedState() === 'loading'
        }

        advertisementIsRewardedStateOpened() {
            return this.advertisementRewardedState() === 'opened'
        }

        advertisementIsRewardedStateRewarded() {
            return this.advertisementRewardedState() === 'rewarded'
        }

        advertisementIsRewardedStateFailed() {
            return this.advertisementRewardedState() === 'failed'
        }

        advertisementIsRewardedStateClosed() {
            return this.advertisementRewardedState() === 'closed'
        }


        advertisementIsBannerSupported() {
            if (!this._canUseBridge()) {
                return false
            }

            return window.bridge.advertisement.isBannerSupported
        }

        advertisementShowBanner(args) {
            if (!this._canUseBridge()) {
                return
            }

            window.bridge.advertisement.showBanner(args.POSITION, args.PLACEMENT)
        }

        advertisementHideBanner() {
            if (!this._canUseBridge()) {
                return
            }

            window.bridge.advertisement.hideBanner()
        }

        advertisementBannerState() {
            if (!this._canUseBridge()) {
                return ''
            }

            return window.bridge.advertisement.bannerState
        }

        advertisementIsBannerStateLoading() {
            return this.advertisementBannerState() === 'loading'
        }

        advertisementIsBannerStateShown() {
            return this.advertisementBannerState() === 'shown'
        }

        advertisementIsBannerStateFailed() {
            return this.advertisementBannerState() === 'failed'
        }

        advertisementIsBannerStateHidden() {
            return this.advertisementBannerState() === 'hidden'
        }


        _fireEvent(name) {
            Scratch.vm.runtime.startHats(`${ID}_${name}`)
        }

        _canUseBridge() {
            return window.bridge && window.bridge.isInitialized
        }
    }
    Scratch.extensions.register(new PlaygamaBridge())
})(Scratch)
