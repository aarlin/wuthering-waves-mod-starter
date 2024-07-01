"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorContentItem = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorContentItem extends UiPanelBase_1.UiPanelBase {
	constructor(t, e) {
		super(),
			(this.R4e = void 0),
			(this.VCt = void 0),
			(this.U4e = void 0),
			(this.Qyt = void 0),
			(this.S1o = 1),
			(this.E1o = void 0),
			(this.CloseAudioDelegate = void 0),
			(this.OnMontageCompleted = void 0),
			(this.ToggleClick = (t) => {
				this.U4e &&
					(this.VCt.RootUIComp.SetUIActive((t = 1 === t)),
					this.U4e(t, this.ContentItemData, this));
			}),
			(this.ButtonClick = () => {
				this.Qyt && this.Qyt(this.ContentItemData, this);
			}),
			(this.y1o = (t) =>
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title)),
			(this.EndPlay = () => {
				this.I1o(1);
			}),
			(this.StartPlay = () => {
				this.I1o(0);
			}),
			(this.BNe = () => {
				let t = 0;
				var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
						this.ContentItemData.RoleId,
					),
					o = e.GetFavorData();
				(t =
					2 === this.ContentItemData.FavorTabType
						? ((e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
								e.GetRoleId(),
								this.ContentItemData.Config.Id,
							)),
							Number(e))
						: o.GetFavorItemState(
								this.ContentItemData.Config.Id,
								this.ContentItemData.FavorTabType,
							)),
					this.GetItem(5).SetUIActive(1 === t);
			}),
			(this.ContentItemData = t),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIExtendToggle],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[4, this.ToggleClick],
				[6, this.ButtonClick],
			]);
	}
	SetToggleFunction(t) {
		this.U4e = t;
	}
	SetButtonFunction(t) {
		this.Qyt = t;
	}
	OnStart() {
		(this.R4e = this.GetExtendToggle(4)),
			(this.VCt = this.GetButton(6)),
			this.VCt.RootUIComp.SetUIActive(!1),
			this.Refresh();
	}
	Refresh() {
		switch (this.ContentItemData.FavorTabType) {
			case 2:
				this.T1o();
				break;
			case 1:
				this.L1o();
				break;
			case 0:
				this.D1o();
				break;
			case 3:
				this.R1o();
		}
	}
	U1o() {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FavorBaseInfo"),
			this.SetLockItemActive(!1),
			this.GetItem(5).SetUIActive(!1),
			(this.E1o = 2);
	}
	A1o() {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FavorPowerFile"),
			this.SetLockItemActive(!1),
			this.GetItem(5).SetUIActive(!1),
			(this.E1o = 2);
	}
	P1o() {
		this.x1o();
		var t = this.GetText(3),
			e = this.ContentItemData.Config;
		e = this.y1o(e);
		t.SetText(e), this.BNe();
	}
	L1o() {
		1 === this.ContentItemData.TypeParam
			? this.U1o()
			: 2 === this.ContentItemData.TypeParam
				? this.A1o()
				: this.P1o();
	}
	T1o() {
		this.x1o();
		var t = this.GetText(3),
			e = this.ContentItemData.Config;
		e = this.y1o(e);
		2 === this.E1o && this.I1o(1), this.w1o(), t.SetText(e), this.BNe();
	}
	D1o() {
		this.x1o();
		var t = this.ContentItemData.Config,
			e = this.GetText(3);
		t = this.y1o(t);
		2 === this.E1o && this.I1o(1), this.B1o(), e.SetText(t), this.BNe();
	}
	R1o() {
		this.x1o();
		var t = this.GetText(3),
			e = this.ContentItemData.Config;
		2 === this.E1o
			? ((e = this.y1o(e)), t.SetText(e))
			: LguiUtil_1.LguiUtil.SetLocalText(t, "Unknown"),
			this.BNe();
	}
	w1o() {
		this.OnMontageCompleted ||
			(this.OnMontageCompleted = (t, e) => {
				e || this.EndPlay();
			});
	}
	B1o() {
		this.CloseAudioDelegate ||
			(this.CloseAudioDelegate = (0, puerts_1.toManualReleaseDelegate)(
				this.EndPlay,
			));
	}
	OnBeforeDestroy() {
		(this.ContentItemData = void 0),
			(this.R4e = void 0),
			(this.VCt = void 0),
			(this.U4e = void 0),
			(this.Qyt = void 0),
			(this.S1o = 1),
			(this.E1o = 0),
			this.CloseAudioDelegate &&
				((0, puerts_1.releaseManualReleaseDelegate)(this.EndPlay),
				(this.CloseAudioDelegate = void 0)),
			this.OnMontageCompleted && (this.OnMontageCompleted = void 0);
	}
	x1o() {
		var t,
			e = this.ContentItemData.FavorTabType,
			o = this.ContentItemData.Config.Id;
		2 === e
			? ((t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.ContentItemData.RoleId,
				)),
				(t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
					t.GetRoleId(),
					o,
				)),
				(this.E1o = Number(t)),
				this.SetLockItemActive(2 !== this.E1o))
			: ((t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
					this.ContentItemData.RoleId,
				)
					.GetFavorData()
					.GetFavorItemState(o, e)),
				this.SetLockItemActive(0 === t),
				(this.E1o = t));
	}
	SetLockItemActive(t) {
		this.GetItem(0).SetUIActive(t),
			this.GetItem(1).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1);
	}
	I1o(t) {
		var e;
		!this.ContentItemData ||
			(2 !== (e = this.ContentItemData.FavorTabType) && 0 !== e) ||
			(0 !== this.E1o &&
				((this.S1o = t),
				this.GetItem(0).SetUIActive(!1),
				this.GetItem(1).SetUIActive(0 === t),
				this.GetItem(2).SetUIActive(1 === t)));
	}
	GetCurVoiceState() {
		return this.S1o;
	}
	SetToggleState(t) {
		this.R4e && this.R4e.SetToggleState(t);
	}
	SetButtonActive(t) {
		this.VCt && this.VCt.RootUIComp.SetUIActive(t);
	}
	GetTog() {
		return this.GetExtendToggle(4);
	}
}
exports.RoleFavorContentItem = RoleFavorContentItem;
