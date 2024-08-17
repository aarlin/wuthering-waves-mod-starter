"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAttributeItem = exports.RoleLevelUpSuccessAttributeView =
		void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	StrengthUpgradeBarItem_1 = require("./StrengthUpgradeBarItem");
class RoleLevelUpSuccessAttributeView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.H_o = void 0),
			(this.$7i = void 0),
			(this.j_o = void 0),
			(this.nqe = () => {
				var e = this.Pe.ClickFunction;
				e && e(), this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UILoopScrollViewComponent],
			[7, UE.UIButtonComponent],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[2, this.nqe],
				[7, this.nqe],
			]);
	}
	OnBeforeCreate() {
		void 0 === this.OpenParam
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Role",
					38,
					"RoleLevelUpSuccessAttributeView 打开失败,未传入界面数据",
				)
			: ((this.Pe = this.OpenParam), this.IBt());
	}
	async OnBeforeStartAsync() {
		(this.$7i = new StrengthUpgradeBarItem_1.StrengthUpgradeBarItem()),
			await this.$7i.CreateByActorAsync(this.GetItem(10).GetOwner());
	}
	OnStart() {
		var e = this.GetItem(5),
			t =
				((e =
					((this.H_o = new LevelShowItem()),
					this.H_o.CreateThenShowByActor(e.GetOwner()),
					this.Pe.WiderScrollView ?? !1)),
				(e =
					(this.GetItem(9).SetUIActive(e),
					this.GetItem(3).SetUIActive(!e),
					e ? this.GetItem(9) : this.GetItem(3))),
				this.GetLoopScrollViewComponent(6));
		t.RootUIComp.SetWidth(e.GetWidth()),
			this.GetItem(8).SetWidth(e.GetWidth()),
			(this.j_o = new LoopScrollView_1.LoopScrollView(
				t,
				e.GetOwner(),
				() => new AttributeSlotItem(),
			));
	}
	OnBeforeShow() {
		this.Refresh();
	}
	OnBeforeDestroy() {
		this.H_o.Destroy(),
			(this.H_o = void 0),
			this.j_o.ClearGridProxies(),
			(this.j_o = void 0);
	}
	IBt() {
		var e = this.Pe.AudioId;
		e &&
			((e = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e).Path),
			this.SetAudioEvent(e));
	}
	Refresh() {
		this.ILt(), this.C_o(), this.W_o(), this.K_o(), this.Q_o(), this.X_o();
	}
	C_o() {
		var e = this.Pe.ClickText ?? "Text_BackToView_Text";
		this.GetText(1).ShowTextNew(e);
	}
	ILt() {
		var e = this.Pe.Title ?? "Text_LevelUpSuccessful_Text";
		this.GetText(0).ShowTextNew(e);
	}
	W_o() {
		var e = this.Pe.LevelInfo;
		void 0 !== e &&
			this.H_o.Refresh(
				e.PreUpgradeLv,
				e.UpgradeLv,
				e?.FormatStringId,
				e?.IsMaxLevel,
			),
			this.GetItem(5).SetUIActive(void 0 !== e);
	}
	K_o() {
		var e = this.Pe.StrengthUpgradeData;
		void 0 !== e && this.$7i.Update(e),
			this.GetItem(10).SetUIActive(void 0 !== e);
	}
	Q_o() {
		void 0 === this.Pe.AttributeInfo || 0 === this.Pe.AttributeInfo.length
			? this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!1)
			: this.j_o.ReloadData(this.Pe.AttributeInfo);
	}
	X_o() {
		this.GetItem(4).SetUIActive(this.Pe.IsShowArrow ?? !1);
	}
}
exports.RoleLevelUpSuccessAttributeView = RoleLevelUpSuccessAttributeView;
class LevelShowItem extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
		];
	}
	Refresh(e, t, i, o) {
		(i = i ?? "Text_AddExp_Text"),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i, e.toString()),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i, t.toString()),
			this.GetItem(2).SetUIActive(o ?? !1);
	}
}
class AttributeSlotItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments), (this.$_o = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		(this.$_o = new RoleAttributeItem()),
			this.$_o.CreateThenShowByActor(this.GetItem(0).GetOwner());
	}
	OnBeforeDestroy() {}
	Refresh(e, t, i) {
		this.$_o.Refresh(e), this.WNe(e.IsNormalBg);
	}
	WNe(e) {
		(e = e ?? !0),
			this.GetItem(1).SetUIActive(!e),
			this.GetItem(2).SetUIActive(e);
	}
}
class RoleAttributeItem extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UITexture],
			[5, UE.UIItem],
		];
	}
	Refresh(e) {
		this.C4e(e.Name),
			this.Kbe(e.IconPath),
			this.GetItem(2).SetUIActive(e.ShowArrow ?? !0);
		var t = [this.GetText(3), this.GetText(1)];
		const i = [e.PreText, e.CurText];
		t.forEach((e, t) => {
			this.Y_o(e, i[t]);
		}),
			void 0 !== e.InnerShowBg && this.J_o(e.InnerShowBg);
	}
	Kbe(e) {
		void 0 !== e && this.SetTextureByPath(e, this.GetTexture(4)),
			this.GetTexture(4).SetUIActive(void 0 !== e);
	}
	C4e(e) {
		void 0 !== e && this.GetText(0).ShowTextNew(e),
			this.GetText(0).SetUIActive(void 0 !== e);
	}
	Y_o(e, t) {
		void 0 !== t && e.SetText(t), e.SetUIActive(void 0 !== t);
	}
	J_o(e) {
		var t = this.GetItem(5);
		t && t.SetUIActive(e);
	}
}
exports.RoleAttributeItem = RoleAttributeItem;
