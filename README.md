# Wuthering Waves QoL Mods

## How to Install

1. Copy `~mod` folder over to `\Wuthering Waves\Wuthering Waves Game\Client\Content\Paks\`

2. Find `Wuthering Waves\Wuthering Waves Game\Client\Binaries\Win64\Client-Win64-Shipping.exe`

3. Right-click and create shortcut

4. Right click new shortcut and choose Properties

5. Change target to be `"C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game\Client\Binaries\Win64\Client-Win64-Shipping.exe" -fileopenlog`

5. Run game with new shortcut

OR

6. Use mod loader: [wuwa_modloader](https://github.com/Sehyn/wuwa_modloader)

## How to Build Locally

1. `npm install`

2. `npm run convertToPak`

## Reverse Engineering Process

1. Open `C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game\Client\Content\Paks` using [Fmodel](https://fmodel.app/download)

2. Under Directory > AES, add AES key: `0xE0D4C0AA387A268B29C397E3C0CAD934522EFC96BE5526D6288EA26351CDACC9`

3. Load `pakchunk11-WindowsNoEditor.pak` in Archives menu

4. Under Folders menu, right-click Client folder and choose `Export Folder's Packages Raw Data (.uasset)`

5. Open exported folder with VS Code

6. Format minified `.js` files with one of the following:  
  i. <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> then select `Format Document` and choose Biome
  ii. <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> inside VS Code
  iii. run `npx @biomejs/biome format --write .`

7. Modify files

8. Repack modified code using `npm run convertToPak`
  i. This will take all folders under `development` and convert each folder into a `.pak` file under `~mod`

9. Copy and paste `~mod` folder into `C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game\Client\Content\Paks`

## Components

### Menus

1. `Content/Aki/JavaScript/Game/Module/Phantom/PhantomBattle/View/PhantomBattleFettersViewItem.js`
2. `Content\Aki\JavaScript\Game\Module\LordGym\View\LordGymChallengeRecordView.js`
3. `Content\Aki\Javascript\Game\Manager\UiViewManager.js`
4. ```js
    var newBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(50);

    newBox.SetTextArgs(state);
    newBox.SetTitle("KunMods State[Home] DisableAntiCheat : ON ");
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newBox);
   ```
5. `Content\Aki\JavaScript\Game\Module\Photograph\View\PhotographSetupView.js`

### Buttons

1. `"BtnItem.js"`
2. `"Button.js"`
3. ```js
    class DropDownItem extends DropDownItemBase_1.DropDownItemBase {
      OnRegisterComponent() {
          this.ComponentRegisterInfos = [
              [0, UE.UIExtendToggle],
              [1, UE.UIText]
          ]
      }
      OnShowDropDownItemBase(e) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name)
      }
      GetDropDownToggle() {
          return this.GetExtendToggle(0)
      }
    }
    const TEXT_INDEX = 0;
    class DropDownTitle extends TitleItemBase_1.TitleItemBase {
        OnRegisterComponent() {
            this.ComponentRegisterInfos = [
                [TEXT_INDEX, UE.UIText]
            ]
        }
        ShowTemp(e, i) {
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(TEXT_INDEX), e.Name)
        }
    }
    exports.DropDownTitle = DropDownTitle;
    ```
4. Exit Button text
    i. `var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ConfirmBox_41_ButtonText_0"),`
5. ```js
   class Button extends UiPanelBase_1.UiPanelBase {
        constructor() {
            super(...arguments), this.OOe = void 0, this.kOe = () => {
                this.OOe ? .()
            }
        }
        OnRegisterComponent() {
            this.ComponentRegisterInfos = [
                [0, UE.UIText],
                [1, UE.UIItem],
                [2, UE.UIText],
                [3, UE.UIButtonComponent]
            ], this.BtnBindInfo = [
                [3, this.kOe]
            ]
        }
        OnBeforeShow() {
            this.GetText(0).SetText(""), this.GetText(2).SetText("")
        }
        async InitializeAsync(e, t) {
            this.OOe = t, await this.CreateByActorAsync(e)
        }
        SetFloatText(e) {
            this.GetText(2).SetUIActive(!0), this.GetText(2).SetText(e)
        }
        SetBtnText(e) {
            this.GetText(0).SetText(e)
        }
    }
    ```
6. `LongPressButton_1 = require("../Util/LongPressButton"),`

### Toggles

1. ```js
    iFr() {
      var t = this.GetExtendToggle(6);
      t.SetToggleState(ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks ? 1 : 0), t.OnStateChange.Clear(), t.OnStateChange.Add(this.w2r), ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() && t.SetSelfInteractive(ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam())
    }
   ```

### Layouts

1. ```js
    t = (this.Xsr = new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i), this.Ksr = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(13), this.tar), this.DFt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(16), () => new ExitSkillTag_1.ExitSkillTag), this.jsr = this.Pe ? .RoleList, this.Pe ? .CurrentRoleId),
   ```

### Views

1. `Content\Aki\JavaScript\Game\Module\RoleSelect\TeamRoleSelectView.js`

### Dropdown

1. `Content\Aki\JavaScript\Game\Module\LordGym\View\LordGymChallengeRecordView.js`

### Database

1. `Content/Aki/Javascript/Game/Define/ConfigQuery/BattlePassById.js`
2. `Content/Aki/Javascript/Game/Define/ConfigQuery/ConfigStatement.js`
3. `Content/Aki/JavaScript/Core/Define/ConfigQuery/OverlayAbpMontageDataById.js`
4. `Content/Aki/JavaScript/Core/Define/ConfigQuery/AbpMontageDataById.js`

### Hotkeys

1. `Client\Content\Aki\JavaScript\Game\InputSettings\Key\InputCombinationActionKey.js`

### Miscellaneous

```js
DamageById_1 = require("./DamageById"),
DamagePayloadById_1 = require("./DamagePayloadById"),
DamageTextAll_1 = require("./DamageTextAll"),
```

```js
UE.KuroStaticLibrary.SaveStringToFile("X秒,当前时间,对象,对象ID,对象名称,技能ID,技能类型,攻击,暴击,爆伤,生命,防御,伤害加成\n" + this.aAo.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "SkillRecord.csv", !0);

SkillRecord.csv
BulletRecord.csv
MoveSum.csv
DamageRecord.csv
DamageRecord_Attr.csv
DamageRecord_Snipeshot.csv
BuffRecord.csv
RoleDamageSum.csv
MonsterDamageSum.csv

UE.FileSystemOperation.ReadFile
UE.KuroStaticLibrary.LoadFileToString

UiManager_1.UiManager.OpenView("InfoDisplayImgView")

class TowerAreaItem extends GridProxyAbstract_1.GridProxyAbstract
class TowerNormalView extends UiViewBase_1.UiViewBase {
```

i. `grep -rlE "LifeValue|CombatInfo" --include \*.js .`
ii. `grep -rlE "LifeValue|CombatInfo" --include \*.js . | xargs code`

    ```bash
    ./Core/Define/Net/Protocol.js
    ./Game/AI/Controller/AiController.js
    ./Game/AI/Controller/AiPerception.js
    ./Game/AI/Controller/AiPerceptionEvents.js
    ./Game/AI/StateMachine/AiStateMachine.js
    ./Game/AI/StateMachine/AiStateMachineGroup.js
    ./Game/AI/StateMachine/Task/AiStateMachineTaskRandomMontage.js
    ./Game/AI/StateMachine/Task/AiStateMachineTaskSkill.js
    ./Game/AnimNotify/TsAnimNotifyEndSkill.js
    ./Game/Module/Abilities/FormationAttributeModel.js
    ./Game/Module/CombatMessage/CombatMessageController.js
    ./Game/Module/CombatMessage/CombatMessageModel.js
    ./Game/Module/CombatMessage/SkillMessageController.js
    ./Game/NewWorld/Character/Common/Component/Abilities/BaseBuffComponent.js
    ./Game/NewWorld/Character/Common/Component/Abilities/CharacterGasDebugComponent.js
    ./Game/NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterActorComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterAiComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterAnimationComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterAnimationSyncComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterCaughtNewComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterCombatMessageComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterFightStateComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterHitComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterLogicStateSyncComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterMovementSyncComponent.js
    ./Game/NewWorld/Character/Common/Component/CharacterPartComponent.js
    ./Game/NewWorld/Character/Common/Component/Skill/CharacterSkillComponent.js
    ./Game/NewWorld/Character/Monster/Entity/Component/MonsterBehaviorComponent.js
    ./Game/Utils/CombatDebugController.js
    ```

    Relevant files

    ```bash
    ./Core/Define/Net/Protocol.js
    ./Game/AI/Controller/AiController.js
    ./Content/Aki/JavaScript/Game/Module/CombatMessage/CombatMessageController.js
    ./Content/Aki/JavaScript/Game/Module/CombatMessage/CombatMessageModel.js
    ./Game/Module/CombatMessage/CombatMessageController.js
    ./Game/NewWorld/Character/Common/Component/Abilities/CharacterGasDebugComponent.js
    ./Game/NewWorld/Character/Common/Component/Abilities/CharacterDamageComponent.js
    ./Game/NewWorld/Character/Common/Component/Abilities/CharacterDamageCalculations.js
    ./Game/NewWorld/Character/Common/Component/CharacterPartComponent.js
    ./Content/Aki/JavaScript/Game/Utils/CombatDebugController.js
    ```

### Architecture

1. Views - `Content\Aki\JavaScript\Game\Module\TowerDetailUi\View\TowerNormalView.js`
2. Items - `Content\Aki\JavaScript\Game\Module\TowerDetailUi\View\TowerAreaItem.js`
3. ControllerHolder > ConfirmBoxController > ShowConfirmBoxNew


## Todos

- [ ] Separate resonator dps on monster
- [ ] See dodge counter
- [ ] Map out boss IDs
