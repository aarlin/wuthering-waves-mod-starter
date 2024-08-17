"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LockExecutionHandle = void 0);
const UE = require("ue"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	CameraController_1 = require("../../../Camera/CameraController"),
	TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LockExecutionUnit_1 = require("../HudUnit/LockExecutionUnit"),
	HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
	HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
	hitCaseSocket = new UE.FName("HitCase");
class LockExecutionHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
	constructor() {
		super(...arguments),
			(this.xHs = new Vector2D_1.Vector2D()),
			(this.Oii = void 0),
			(this.sDe = void 0),
			(this.aXe = !1),
			(this.dce = !1),
			(this.kii = 0),
			(this.AYe = (e, i) => {
				e ? this.Fii(i) : this.Vii(i);
			}),
			(this.zpe = () => {
				this.sDe && this.nst();
			});
	}
	OnInitialize() {
		this.kii = CommonParamById_1.configCommonParamById.GetIntConfig(
			"LockExecutionShowDistance",
		);
	}
	OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
			this.AYe,
		);
	}
	OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
			this.AYe,
		);
	}
	Fii(e) {
		this.sDe?.Id !== e &&
			((e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))
				? (this.tXe(), (this.sDe = e), this._o())
				: this.nst());
	}
	Vii(e) {
		this.sDe?.Id === e && this.nst();
	}
	_o() {
		this.eXe(), this.uii();
	}
	nst() {
		this.tXe(), (this.dce = !1), this.Hii(), (this.sDe = void 0);
	}
	eXe() {
		this.sDe &&
			EventSystem_1.EventSystem.AddWithTarget(
				this.sDe,
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			);
	}
	tXe() {
		this.sDe &&
			EventSystem_1.EventSystem.RemoveWithTarget(
				this.sDe,
				EventDefine_1.EEventName.RemoveEntity,
				this.zpe,
			);
	}
	OnTick(e) {
		super.OnTick(e),
			this.aXe ||
				(this.Oii &&
					(this.jii(), this.dce ? this.Oii.TryShow() : this.Oii.TryHide(!0)));
	}
	jii() {
		var e, i;
		this.sDe?.Valid &&
		(e = this.Wii()) &&
		((i = CameraController_1.CameraController.CameraLocation),
		!(
			Math.pow(i.X - e.X, 2) + Math.pow(i.Y - e.Y, 2) + Math.pow(i.Z - e.Z, 2) <
			this.kii
		)) &&
		HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(e, this.xHs)
			? ((this.dce = !0),
				this.Oii.GetRootItem().SetAnchorOffset(this.xHs.ToUeVector2D(!0)))
			: (this.dce = !1);
	}
	uii() {
		this.Oii
			? (this.jii(), this.dce ? this.Oii.TryShow() : this.Oii.TryHide(!0))
			: this.fii();
	}
	fii() {
		this.aXe ||
			((this.aXe = !0),
			this.NewHudUnit(
				LockExecutionUnit_1.LockExecutionUnit,
				"UiItem_PutDeath",
				!1,
			).then(
				(e) => {
					e &&
						!this.IsDestroyed &&
						((this.aXe = !1),
						(this.Oii = e),
						this.jii(),
						this.dce ? this.Oii.TryShow() : this.Oii.TryHide(!1));
				},
				() => {},
			));
	}
	Hii() {
		this.Oii && this.Oii.TryHide(!0);
	}
	Wii() {
		var e = this.sDe.Entity.GetComponent(1).Owner;
		if (e instanceof TsBaseCharacter_1.default)
			return e.Mesh.GetSocketLocation(hitCaseSocket);
	}
}
exports.LockExecutionHandle = LockExecutionHandle;
