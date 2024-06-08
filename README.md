# Wuthering Waves DPS Meter

## How to Install

1. Place the mod file in the \Wuthering Waves\Wuthering Waves Game\Client\Content\Paks\~mod\

2. Find Wuthering Waves\Wuthering Waves Game\Client\Binaries\Win64\Client-Win64-Shipping.exe

3. Run game with command line(startupArguments) "-fileopenlog"

## Reverse Engineering Process

1. Open `C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game\Client\Content\Paks` using [Fmodel](https://fmodel.app/download)

2. Under Directory > AES, add AES key: `0xE0D4C0AA387A268B29C397E3C0CAD934522EFC96BE5526D6288EA26351CDACC9`

3. Load `pakchunk11-WindowsNoEditor.pak` in Archives menu

4. Under Folders menu, right-click Client folder and choose `Export Folder's Packages Raw Data (.uasset)`

5. Change directory to exported folder

6. Search for specific log content using:
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

7. Beautify files using VSCode Extension: `HookyQR.beautify`

8. Find and modify files to include extra logging

9. Packaging using UE4.26

## Components

Menus

1.
2.

Buttons

1.
2.

Database

1. `Content/Aki/Javascript/Game/Define/ConfigQuery/BattlePassById.js`
2. `Content/Aki/Javascript/Game/Define/ConfigQuery/ConfigStatement.js`

```js
DamageById_1 = require("./DamageById"),
DamagePayloadById_1 = require("./DamagePayloadById"),
DamageTextAll_1 = require("./DamageTextAll"),
```


## Todos

- [ ] Separate resonator dps on monster
- [ ] See dodge counter
- [ ] Map out boss IDs
