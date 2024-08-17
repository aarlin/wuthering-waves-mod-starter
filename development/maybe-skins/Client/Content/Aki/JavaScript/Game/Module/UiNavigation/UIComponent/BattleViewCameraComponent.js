"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleViewCameraComponent = void 0);
const Global_1 = require("../../../Global"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class BattleViewCameraComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor(t) {
		super(t),
			(this.sbo = !1),
			(this.abo = void 0),
			(this.gze = (t, e) => {
				if (
					((this.sbo = 0 === e),
					(e = Global_1.Global.BaseCharacter) &&
						(e = e.CharacterActorComponent.Entity) &&
						(e = e.GetComponent(185)))
				)
					return e.HasTag(-1315735076)
						? this.abo
							? void 0
							: void (this.abo = e.ListenForTagAddOrRemove(
									-1315735076,
									(t, e) => {
										e ||
											(this.SetVisibleMode(2, this.sbo),
											this.abo.EndTask(),
											(this.abo = void 0));
									},
								))
						: void this.SetVisibleMode(2, this.sbo);
			}),
			InputDistributeController_1.InputDistributeController.BindAction(
				InputMappingsDefine_1.actionMappings.组合主键,
				this.gze,
			);
	}
	OnClear() {
		InputDistributeController_1.InputDistributeController.UnBindAction(
			InputMappingsDefine_1.actionMappings.组合主键,
			this.gze,
		);
	}
	OnRefreshSelfHotKeyState(t) {
		this.SetVisibleMode(2, this.sbo);
	}
}
exports.BattleViewCameraComponent = BattleViewCameraComponent;
