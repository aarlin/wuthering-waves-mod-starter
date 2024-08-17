"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterLockOnComponent_1 = require("../../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
	ActorUtils_1 = require("../../Utils/ActorUtils"),
	CameraController_1 = require("../CameraController");
class CameraFocusInputParams {
	constructor() {
		this.LockOnInfo = void 0;
	}
}
class CameraNofityStateFocusInput extends UE.KuroAnimNotifyState {
	constructor() {
		super(...arguments),
			(this.FocusLimitLength = 0),
			(this.PitchSpeed = 0),
			(this.YawSpeed = 0),
			(this.MinDistance = -0),
			(this.MaxDistance = 1e3),
			(this.LockOnPart = ""),
			(this.ParamsMap = new Map()),
			(this.IsInitialize = !1);
	}
	K2_NotifyBegin(t, e, a) {
		if (
			(this.Init(), (t = t?.GetOwner()), t instanceof TsBaseCharacter_1.default)
		) {
			this.ParamsMap.has(t.EntityId) ||
				this.ParamsMap.set(t.EntityId, new CameraFocusInputParams());
			var r = this.ParamsMap.get(t.EntityId);
			if (!r.LockOnInfo) {
				var o = ActorUtils_1.ActorUtils.GetEntityByActor(t);
				t = t.GetEntityNoBlueprint();
				if (t?.Valid) {
					var n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
					if (!n) return !1;
					t = t.GetComponent(1)?.ActorLocationProxy;
					var i = n.Entity.GetComponent(1)?.ActorLocationProxy;
					if (
						(t = Vector_1.Vector.Dist(t, i)) < this.MinDistance ||
						t > this.MaxDistance
					)
						return !1;
					(i = n?.Entity?.GetComponent(29)),
						i &&
							(((t = new CharacterLockOnComponent_1.LockOnInfo()).EntityHandle =
								o),
							(t.SocketName =
								"None" === this.LockOnPart ? "" : this.LockOnPart),
							(r.LockOnInfo = t),
							i.ForceLookAtTarget(t, !0));
				}
				CameraController_1.CameraController.FightCamera.LogicComponent.OpenFocusInputController(
					!0,
					this.YawSpeed,
					this.PitchSpeed,
					this.FocusLimitLength,
				);
			}
		}
		return !1;
	}
	K2_NotifyEnd(t, e) {
		var a;
		t = t?.GetOwner();
		return (
			t instanceof TsBaseCharacter_1.default &&
			!!(a = this.ParamsMap.get(t.EntityId)) &&
			!(
				!a.LockOnInfo ||
				!t?.IsValid() ||
				!(t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
				((t = t.Entity?.GetComponent(29)) &&
					t.ForceLookAtTarget(a.LockOnInfo, !1, !0),
				CameraController_1.CameraController.FightCamera.LogicComponent.OpenFocusInputController(
					!1,
					this.YawSpeed,
					this.PitchSpeed,
					this.FocusLimitLength,
				),
				(a.LockOnInfo = void 0))
			)
		);
	}
	Init() {
		(this.IsInitialize && !GlobalData_1.GlobalData.IsPlayInEditor) ||
			((this.ParamsMap = new Map()), (this.IsInitialize = !0));
	}
	GetNotifyName() {
		return "强制锁定角色";
	}
}
exports.default = CameraNofityStateFocusInput;
