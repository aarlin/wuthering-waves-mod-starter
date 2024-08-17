"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimHelp = void 0);
const CombatDebugScript_1 = require("./CombatDebugScript");
class AnimHelp extends CombatDebugScript_1.CombatScriptSet {
	constructor() {
		super(),
			(this.ResetAnimInstanceCmd = new CombatDebugScript_1.CombatScriptUnit(
				"AnimHelp.ResetAnimInstanceCmd",
				"\nconst entityId = 15;\nEventSystem.EmitWithTarget(EntitySystem.Get(entityId), EEventName.CharChangeMeshAnim);",
				"重置动画蓝图",
				"",
			)),
			(this.GetAnimInstanceCmd = new CombatDebugScript_1.CombatScriptUnit(
				"AnimHelp.GetAnimInstanceCmd",
				"\nconst entityId = 15;\nconst animInstance = EntitySystem.Get(entityId).GetComponentByEnum(EComponent.CharacterAnimationComponent).MainAnimInstance;\nanimInstance.GetName();\n\n//以下是测试代码，删除【// + 中文】进行测试\n//布尔值修改 animInstance.bComponentStart = false;\n//旋转值修改 animInstance.LowerBodyRotator = new UE.Rotator(90,90,90);\n//向量值修改 animInstance.XXXXX = new UE.Vector(0,0,0);\n        ",
				"获取动画蓝图实例",
				"获取动画蓝图实例后，可进行动画蓝图变量的实时参数",
			)),
			(this.Introduction =
				"\n        /** Welcome to use AnimHelp\n        *\n        *  你可以在这里找部分动画功能相关的调试指令\n        *\n        *  如下指令将获取到运行时实体编号为13的实体\n        *  EntitySystem.Get(13)\n        *  然后你最近修改了这个实体的动画蓝图，\n        *  虽然引擎初始化了它，但脚本层没有，所以它没有任何的脚本相关数据更新\n        *  你可以尝试将它重新走一遍脚本的初始化\n        *  输入下列指令:\n        *  EventSystem.EmitWithTarget(EntitySystem.Get(13), EEventName.CharChangeMeshAnim);\n        *  如果不是很方便你也可以输入\n        *  AnimHelp.ResetAnimInstanceCmd\n        *  点击【执行】代码将会执行指令\n        *  点击【解析命令】将会把短句的指令完整替换到具体指令，以方便修改。\n        *\n        *\n        *\n        *\n        *\n        *\n        */;"),
			this.CombatScriptUnits.push(
				this.ResetAnimInstanceCmd,
				this.GetAnimInstanceCmd,
			);
		for (const n of this.CombatScriptUnits) this.Introduction += n.ToString();
	}
}
exports.AnimHelp = AnimHelp;
