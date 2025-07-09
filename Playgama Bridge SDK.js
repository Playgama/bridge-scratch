// Name: Playgama Bridge SDK
// ID: playgama
// Description: Playgama Bridge SDK Extension for Scratch

(function(Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Playgama Bridge SDK Extension requires unsandboxed mode to work");
    }
    class PlaygamaBridgeSDKExtension {
        constructor() {
            window.bridge = undefined;
            window.playgamaLogo = "https://media.licdn.com/dms/image/v2/D4D0BAQE4x8XvJdXdqQ/company-logo_200_200/company-logo_200_200/0/1732802853494/playgama_logo?e=2147483647&v=beta&t=KyjDWrS3NiCTlhYSvKCVJzpuxyBkvYWGTV9Z39mFRiM"; // лого плейгамы с LinkedIn
            window.debug = false;
            window.isAdOpened = false;
            window.isRewardedAdClosed = true;
            window.isRewarded = false;
            window.isInterstitialAdClosed = true;
            window.triggerRAC = false;
            window.triggerIAC = false;
            window.alreadyRated = false;
            window.storageType = "local_storage";
            window.savedvars = {};
        }
        getInfo() {
            return {
                id: "playgama",
                name: window.debug ? "Playgama Bridge SDK (Developer Mode)" : "Playgama Bridge SDK",
                blockIconURI: window.playgamaLogo,
                menuIconURI: window.playgamaLogo,
                color1: "#9747FF",
                blocks: [
                    {
                        func: "downloadPlaygamaBridgeFile",
                        blockType: Scratch.BlockType.BUTTON,
                        text: 'Download "playgama-bridge.js" file',
                        hideFromPalette: true // если понадобится, то можно будет убрать эту строку
                    },
                    {
                        func: "enableDebug",
                        blockType: Scratch.BlockType.BUTTON,
                        text: "Enable developer mode",
                        hideFromPalette: window.debug
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Initialization"
                    },
                    {
                        opcode: "initSDK",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "initialize Playgama Bridge SDK"
                    },
                    {
                        opcode: "SDKenabled",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is SDK initialized?"
                    },
                    {
                        opcode: "debugEnabled",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is developer mode enabled?"
                    },
                    {
                        opcode: "sendMessageToPlatform",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "send message [MESSAGE] to platform",
                        arguments: {
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "PLATFORM_MESSAGES"
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Storages"
                    },
                    {
                        opcode: "isStorageAvailable",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is storage [STORAGE_TYPES] available?",
                        arguments: {
                            STORAGE_TYPES: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "STORAGE_TYPES"
                            }
                        }
                    },
                    {
                        opcode: "isStorageSupported",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is storage [STORAGE_TYPES] supported?",
                        arguments: {
                            STORAGE_TYPES: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "STORAGE_TYPES"
                            }
                        }
                    },
                    "---", // this is a separator in the blocks palette
                    {
                        opcode: "saveVar",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "save variable [NAME] with value [VALUE] to storage [STORAGE_TYPES]",
                        arguments: {
                            NAME: {
                                defaultValue: "level",
                                type: Scratch.ArgumentType.STRING
                            },
                            VALUE: {
                                defaultValue: "10",
                                type: Scratch.ArgumentType.STRING
                            },
                            STORAGE_TYPES: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "STORAGE_TYPES"
                            }
                        }
                    },
                    {
                        opcode: "deleteVar",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "delete variable [NAME] from storage [STORAGE_TYPES]",
                        arguments: {
                            NAME: {
                                defaultValue: "level",
                                type: Scratch.ArgumentType.STRING
                            },
                            STORAGE_TYPES: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "STORAGE_TYPES"
                            }
                        }
                    },
                    {
                        opcode: "getVar",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "get variable [NAME] from storage [STORAGE_TYPES]",
                        disableMonitor: true,
                        arguments: {
                            NAME: {
                                defaultValue: "level",
                                type: Scratch.ArgumentType.STRING
                            },
                            STORAGE_TYPES: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "STORAGE_TYPES"
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Advertisements"
                    },
                    {
                        opcode: "showInterstitialAd",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "show interstitial ad"
                    },
                    {
                        opcode: "whenInterstitialClosed",
                        blockType: Scratch.BlockType.HAT,
                        text: "when interstitial ad closed"
                    },
                    {
                        opcode: "isInterstitialClosed",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is interstitial ad closed?"
                    },
                    "---",
                    {
                        opcode: "showRewarded",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "show rewarded ad"
                    },
                    {
                        opcode: "whenRewardedClosed",
                        blockType: Scratch.BlockType.HAT,
                        text: "when rewarded ad closed"
                    },
                    {
                        opcode: "isRewardedClosed",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is rewarded ad closed?"
                    },
                    {
                        opcode: "isRewardedRewarded",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is rewarded ad rewarded?" // lol
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Rate game"
                    },
                    {
                        opcode: "canRateGame",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "can open game rate popup?"
                    },
                    {
                        opcode: "openRatePopup",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "open game rate popup"
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Platform Information"
                    },
                    {
                        opcode: "serverTime",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "server time",
                        disableMonitor: true
                    },
                    {
                        opcode: "language",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "platform language"
                    },
                    {
                        opcode: "platformType",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "platform type"
                    },
                    {
                        opcode: "deviceType",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "device type"
                    },
                    {
                        opcode: "isDesktop",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is desktop?"
                    },
                    {
                        opcode: "isMobile",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is mobile?"
                    },
                    {
                        opcode: "isTablet",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is tablet?"
                    },
                    {
                        opcode: "isTV",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is TV?"
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Clipboard"
                    },
                    {
                        opcode: "clipboardWrite",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "write [WRITE] to clipboard",
                        arguments: {
                            WRITE: {
                                defaultValue: "Playgama SDK",
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: "clipboardRead",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "read data from clipboard"
                    },
                    {
                        opcode: "isClipboardSupported",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is clipboard supported?"
                    },
                ],
                menus: {
                    PLATFORM_MESSAGES: {
                        acceptReporters: true,
                        items: [
                            "game ready",
                            "in game loading started",
                            "in game loading stopped",
                            "gameplay started", "gameplay stopped",
                            "player got achievement"
                        ]
                    },
                    STORAGE_TYPES: {
                        acceptReporters: true,
                        items: [
                            "local storage",
                            "platform internal"
                        ]
                    }
                }
            };
        }

        focusAudio(type) {
            if (window.bridge == undefined) {
                return
            };
            window.isAdOpened = false;
            
            if (type == "debug") {
                document.addEventListener("visibilitychange", () => {
                    if (window.isAdOpened == false) {
                        if (document.hidden) {
                            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
                        } else {
                            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
                        }
                    }
                }, false);
            }
            if (type == "bridge") {
                bridge.game.on(bridge.EVENT_NAME.VISIBILITY_STATE_CHANGED, state => {
                    if (window.isAdOpened == false) {
                        if (state == "hidden") {
                            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
                        } else {
                            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
                        }
                    }
                });
            }
        }

        async initSDK() {
            if (window.bridge != undefined) return;
            
            if (window.debug == true) {
                window.bridge = "debug";
                window.savedvars = {};
                console.info("%c Developer mode Initialized. ", "background: #01A5DA; color: white");
                this.focusAudio("debug");
                return;
            }

            return new Promise(resolve => {
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event
                document.addEventListener('contextmenu', event => event.preventDefault());

                const longtap = document.createElement("style");
                longtap.textContent = `
                  /* https://vk.com/wall-57855408_291838 */
                  body {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                  }
                `;
                document.body.appendChild(longtap);

                const playgama_bridge = document.createElement("script");
                playgama_bridge.src = "./playgama-bridge.js";
                document.head.appendChild(playgama_bridge);
                playgama_bridge.onload = async () => {
                    await bridge.initialize()
                        .then(() => {
                            window.bridge = bridge;
                            console.info("%c Playgama Bridge SDK Initialized. ", "background: #01A5DA; color: white");
                            this.focusAudio("bridge");
                            resolve();
                        })
                        .catch(error => {
                            console.error(error);
                            resolve();
                        });
                }

                playgama_bridge.onerror = function() {
                    console.error("Failed to load Playgama Bridge SDK");
                    alert("Failed to integrate Playgama Bridge SDK, add to your project playgama-bridge.js file, if you didn't already\n\nIf you in editor, enable developer mode before initialization");
                    resolve();
                }
            });
        }

        SDKenabled() {
            return (window.bridge != undefined);
        }

        debugEnabled() {
            return (window.debug == true);
        }

        enableDebug() {
            window.alreadyRated = false;
            window.debug = true;
            alert("Developer mode enabled")
            Scratch.vm.extensionManager.refreshBlocks(); // taken from Animated Text extension
        }

        downloadPlaygamaBridgeFile() { // может быть, вам это понадобится
            const link = document.createElement("a");
            link.href = "https://github.com/playgama/bridge/releases/latest/download/playgama-bridge.js";
            link.download = "playgama-bridge.js";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        async clipboardWrite(args) {
            if (window.bridge == undefined) {
                return
            };
            if (window.debug == true) {
                navigator.clipboard.writeText(args.WRITE)
                return;
            }
            return new Promise(async resolve => {
                await bridge.clipboard.write(args.WRITE)
                resolve();
            });
        }

        async clipboardRead() {
            if (window.bridge == undefined) {
                return ""
            };
            if (window.debug == true) {
                // taken from Clipboard extension
                if (navigator.clipboard && navigator.clipboard.readText) {
                    return Scratch.canReadClipboard()
                        .then(allowed => {
                            if (allowed) {
                                return navigator.clipboard.readText()
                                    .then(result => {
                                        console.log("data read from clipboard", result);
                                        return result ?? "";
                                    });
                            }
                            return "";
                        })
                        .catch(error => {
                            console.error(error);
                            return "";
                        })
                }
                console.error("failed to read clipboard data");
                return "";
            }
            return await bridge.clipboard.read()
                .then(result => {
                    console.log("data read from clipboard", result);
                    return result;
                })
                .catch(error => {
                    console.error(error);
                    return "";
                })
        }

        isClipboardSupported() {
            if (window.bridge == undefined) {
                return false
            };
            if (window.debug == true) {
                return Scratch.canReadClipboard().then(allowed => {
                    return allowed
                });
            }
            return bridge.clipboard.isSupported;
        }

        async serverTime() {
            if (window.bridge == undefined) {
                return ""
            };
            if (window.debug == true) {
                console.log(Date.now());
                return (Date.now());
            }
            return await bridge.platform.getServerTime()
                .then(result => {
                    console.log(result);
                    return result;
                })
                .catch(error => {
                    console.error(error);
                    return "";
                })
        }

        language() {
            if (window.bridge == undefined) {
                return ""
            };
            if (window.debug == true) {
                return "en"; // not really, but ok
            }
            return bridge.platform.language;
        }

        platformType() {
            if (window.bridge == undefined) {
                return ""
            };
            if (window.debug == true) {
                return "Scratch"; // not really, but ok
            }
            return bridge.platform.id;
        }

        deviceType() {
            if (window.bridge == undefined) {
                return ""
            };
            if (window.debug == true) {
                return "desktop"; // not really, but ok
            }
            return bridge.device.type;
        }

        isDesktop() {
            return (this.deviceType() == "desktop");
        }

        isMobile() {
            return (this.deviceType() == "mobile");
        }

        isTablet() {
            return (this.deviceType() == "tablet");
        }

        isTV() {
            return (this.deviceType() == "tv");
        }

        canRateGame() {
            if (window.bridge == undefined) {
                return false
            };
            if (window.debug == true) {
                return (window.alreadyRated != true);
            }
            return bridge.social.isRateSupported;
        }

        async openRatePopup() {
            if (window.bridge == undefined) {
                return
            };
            if (window.debug == true) {
                window.alreadyRated = true;
                console.log("rate game")
                alert("Rate game");
                return;
            }
            return new Promise(async resolve => {
                console.log("rate game")
                await bridge.social.rate();
                resolve();
            });
        }

        triggerRAC() {
            window.triggerRAC = true;
        }

        triggerIAC() {
            window.triggerIAC = true;
        }

        isRewardedClosed() {
            if (window.bridge == undefined) {
                return false
            };
            return (window.isRewardedAdClosed == true);
        }

        isRewardedRewarded() {
            if (window.bridge == undefined) {
                return false
            };
            return (window.isRewarded == true);
        }

        whenRewardedClosed() {
            if (window.bridge == undefined) return false;
            if (window.triggerRAC) {
                window.triggerRAC = false;
                return true;
            }
            return false;
        }

        isInterstitialClosed() {
            if (window.bridge == undefined) {
                return false
            };
            return (window.isInterstitialAdClosed == true);
        }

        whenInterstitialClosed() {
            if (window.bridge == undefined) return false;
            if (window.triggerIAC) {
                window.triggerIAC = false;
                return true;
            }
            return false;
        }

        isStorageAvailable(args) {
            if (window.bridge == undefined) {
                return false
            };
            if (window.debug == true) {
                switch (args.STORAGE_TYPES) {
                    case "local storage":
                        return true;
                    case "platform internal":
                        return false;
                    default:
                        console.error("failed to check storage availability");
                        return false;
                }
            }
            switch (args.STORAGE_TYPES) {
                case "local storage":
                    return bridge.storage.isAvailable("local_storage");
                case "platform internal":
                    return bridge.storage.isAvailable("platform_internal");
                default:
                    console.error("failed to check storage availability");
                    return false;
            }
        }

        isStorageSupported(args) {
            if (window.bridge == undefined) {
                return false
            };
            if (window.debug == true) {
                switch (args.STORAGE_TYPES) {
                    case "local storage":
                        return true;
                    case "platform internal":
                        return false;
                    default:
                        console.error("failed to check storage support");
                        return false;
                }
            }
            switch (args.STORAGE_TYPES) {
                case "local storage":
                    return bridge.storage.isSupported("local_storage");
                case "platform internal":
                    return bridge.storage.isSupported("platform_internal");
                default:
                    console.error("failed to check storage support");
                    return false;
            }
        }

        async saveVar(args) {
            if (window.bridge == undefined) {
                return
            };
            if (window.debug == true) {
                if (args.STORAGE_TYPES == "local storage") {
                    window.savedvars[args.NAME] = args.VALUE;
                    console.log("data saved to object", window.savedvars);
                }
                return;
            }
            switch (args.STORAGE_TYPES) {
                case "local storage":
                    window.storageType = "local_storage";
                    break;
                case "platform internal":
                    window.storageType = "platform_internal";
                    break;
                default:
                    console.error("failed to save data");
                    return;
            }
            return new Promise(async resolve => {
                await bridge.storage.set(args.NAME, args.VALUE, window.storageType)
                    .then(() => console.log("data saved to cloud"))
                    .catch(error => console.error(error));
                console.log("data saved to cloud", args.NAME, args.VALUE);
                resolve();
            });
        }

        async getVar(args) {
            if (window.bridge == undefined) {
                return ""
            };
            if (window.debug == true) {
                if (args.STORAGE_TYPES == "local storage") {
                    console.log(window.savedvars[args.NAME]);
                    return window.savedvars[args.NAME] || "";
                }
                return "";
            }
            switch (args.STORAGE_TYPES) {
                case "local storage":
                    window.storageType = "local_storage";
                    break;
                case "platform internal":
                    window.storageType = "platform_internal";
                    break;
                default:
                    console.error("failed to get data");
                    return "";
            }
            return await bridge.storage.get(args.NAME, window.storageType)
                .then(data => {
                    console.log("data received:", data);
                    return data;
                })
                .catch(error => {
                    console.error(error);
                    return "";
                })
        }

        async deleteVar(args) {
            if (window.bridge == undefined) {
                return
            };
            if (window.debug == true) {
                if (args.STORAGE_TYPES == "local storage") {
                    delete window.savedvars[args.NAME];
                    console.log("data deleted");
                }
                return;
            }
            switch (args.STORAGE_TYPES) {
                case "local storage":
                    window.storageType = "local_storage";
                    break;
                case "platform internal":
                    window.storageType = "platform_internal";
                    break;
                default:
                    console.error("failed to delete data");
                    return;
            }
            return new Promise(async resolve => {
                await bridge.storage.delete(args.NAME, window.storageType)
                    .then(() => console.log("data deleted"))
                    .catch(error => console.error(error))
                resolve();
            });
        }

        async sendMessageToPlatform(args) {
            if (window.bridge == undefined) {
                return
            };
            if (window.debug == true) {
                console.log("message was sent to platform") // (нет) lol
                return;
            }
            return new Promise(async resolve => {
                // возможно можно было сделать это по другому, но пока так
                switch (args.MESSAGE) {
                    case "game ready":
                        await bridge.platform.sendMessage("game_ready")
                            .then(() => console.log("message was sent to platform"))
                            .catch(error => console.error(error));
                        resolve();
                        break;
                    case "in game loading started":
                        await bridge.platform.sendMessage("in_game_loading_started")
                            .then(() => console.log("message was sent to platform"))
                            .catch(error => console.error(error));
                        resolve();
                        break;
                    case "in game loading stopped":
                        await bridge.platform.sendMessage("in_game_loading_stopped")
                            .then(() => console.log("message was sent to platform"))
                            .catch(error => console.error(error));
                        resolve();
                        break;
                    case "gameplay started":
                        await bridge.platform.sendMessage("gameplay_started")
                            .then(() => console.log("message was sent to platform"))
                            .catch(error => console.error(error));
                        resolve();
                        break;
                    case "gameplay stopped":
                        await bridge.platform.sendMessage("gameplay_stopped")
                            .then(() => console.log("message was sent to platform"))
                            .catch(error => console.error(error));
                        resolve();
                        break;
                    case "player got achievement":
                        await bridge.platform.sendMessage("player_got_achievement")
                            .then(() => console.log("message was sent to platform"))
                            .catch(error => console.error(error));
                        resolve();
                        break;
                    default:
                        console.error("failed to send message to platform");
                        resolve();
                        break;
                }
            });
        }

        audioOff() {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 0;
        }

        audioOn() {
            Scratch.vm.runtime.audioEngine.inputNode.gain.value = 1;
        }

        async showInterstitialAd() {
            if (window.bridge == undefined) {
                return
            };
            if (window.debug == true) {
                window.isAdOpened = true;
                this.audioOff();
                window.isInterstitialAdClosed = false;
                console.log("interstitial ad opened")
                alert("Interstitial ad");
                window.isAdOpened = false;
                this.audioOn();
                this.triggerIAC();
                window.isInterstitialAdClosed = true;
                console.log("interstitial ad closed")
                return;
            }
            return new Promise(async resolve => {
                await bridge.advertisement.showInterstitial();
                resolve();
                bridge.advertisement.on(bridge.EVENT_NAME.INTERSTITIAL_STATE_CHANGED, state => {
                    if (state == "opened") {
                        window.isInterstitialAdClosed = false;
                        window.isAdOpened = true;
                        this.audioOff();
                        console.log("interstitial ad opened")
                    }
                    if (state == "closed") {
                        window.isAdOpened = false;
                        this.audioOn();
                        this.triggerIAC();
                        window.isInterstitialAdClosed = true;
                        console.log("interstitial ad closed")
                    }
                    if (state == "failed") {
                        window.isAdOpened = false;
                        this.audioOn();
                        this.triggerIAC();
                        window.isInterstitialAdClosed = true;
                        console.error("failed to show interstitial ad")
                    }
                });
            });
        }

        async showRewarded() {
            if (window.bridge == undefined) {
                return
            };
            if (window.debug == true) {
                window.isRewardedAdClosed = false;
                window.isRewarded = false;
                window.isAdOpened = true;
                this.audioOff();
                console.log("rewarded ad opened")
                const answer = confirm('Rewarded ad! Press "OK" to receive a reward and close the ad or press "Cancel" to just close the ad');
                if (answer == true) {
                    window.isRewarded = true;
                    console.log("reward received")
                }
                window.isAdOpened = false;
                this.audioOn();
                this.triggerRAC();
                window.isRewardedAdClosed = true;
                console.log("rewarded ad closed")
                return;
            }
            return new Promise(async resolve => {
                await bridge.advertisement.showRewarded();
                resolve();
                bridge.advertisement.on(bridge.EVENT_NAME.REWARDED_STATE_CHANGED, state => {
                    if (state == "opened") {
                        window.isRewardedAdClosed = false;
                        window.isRewarded = false;
                        window.isAdOpened = true;
                        this.audioOff();
                        console.log("rewarded ad opened")
                    }
                    if (state == "rewarded") {
                        window.isRewarded = true;
                        console.log("reward received")
                    }
                    if (state == "closed") {
                        window.isAdOpened = false;
                        this.audioOn();
                        this.triggerRAC();
                        window.isRewardedAdClosed = true;
                        console.log("rewarded ad closed")
                    }
                    if (state == "failed") {
                        window.isAdOpened = false;
                        window.isRewardedAdClosed = true;
                        window.isRewarded = false;
                        this.triggerRAC();
                        console.error("failed to show rewarded ad")
                    }
                });
            });
        }
    }
    Scratch.extensions.register(new PlaygamaBridgeSDKExtension());
})(Scratch);