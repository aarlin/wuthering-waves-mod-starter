"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomFettersObtainItem = exports.PhantomFettersItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	VisionFetterSuitItem_1 = require("../../Vision/View/VisionFetterSuitItem");
class PhantomFettersItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.dqt = void 0),
			(this.PPt = void 0),
			(this.nmi = void 0),
			(this.UIt = (t) => {
				this.nmi && this.nmi(this.dqt);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.UIt]]);
	}
	OnStart() {
		(this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
			this.GetItem(2),
		)),
			this.PPt.Init().finally(() => {
				this.PPt.SetActive(!0);
			}),
			this.GetItem(3).SetUIActive(!1),
			this.GetExtendToggle(0).SetToggleState(0);
	}
	Refresh(t, e, i) {
		(this.dqt = t),
			this.RefreshName(),
			this.d6i(),
			this.RefreshUnlockText(),
			this.IVe(e, !1);
	}
	RefreshName() {
		this.GetText(1).ShowTextNew(this.dqt.FetterGroupName);
	}
	RefreshUnlockText() {
		var t = this.dqt.Id,
			e =
				((t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
						t,
					)),
				ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArray(
					t,
				));
		this.GetText(4).SetText(e + "/" + t.length);
	}
	BindOnItemButtonClickedCallback(t) {
		this.nmi = t;
	}
	OnSelected(t) {
		this.IVe(!0);
	}
	OnDeselected(t) {
		this.IVe(!1);
	}
	d6i() {
		this.PPt.Update(this.dqt);
	}
	IVe(t, e = !0) {
		var i = this.GetExtendToggle(0);
		t ? i.SetToggleState(1, e) : i.SetToggleState(0, !1);
	}
}
exports.PhantomFettersItem = PhantomFettersItem;
class PhantomFettersObtainItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.c6i = 0),
			(this.nmi = void 0),
			(this.wqe = void 0),
			(this.C6i = () => {
				this.nmi &&
					(UiManager_1.UiManager.CloseView("PhantomBattleFettersObtainView"),
					this.nmi(this.c6i));
			}),
			(this.wqe = t);
	}
	Init() {
		this.CreateThenShowByActor(this.wqe.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[3, this.C6i]]);
	}
	Update(t) {
		(this.c6i = t.Id),
			t.IsGet
				? (this.SetTextureByPath(t.Icon, this.GetTexture(0)),
					this.GetText(1).ShowTextNew(t.Name))
				: ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"T_IconMonsterHead00_UI",
					)),
					this.SetTextureByPath(t, this.GetTexture(0)),
					this.GetText(1).SetText("???")),
			this.GetText(2).SetUIActive(!1);
	}
	BindOnItemButtonClickedCallback(t) {
		this.nmi = t;
	}
}
exports.PhantomFettersObtainItem = PhantomFettersObtainItem;
