"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushBuffSelectView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	BossRushModel_1 = require("./BossRushModel");
class BossRushBuffSelectView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.RUr = void 0),
			(this.UUr = void 0),
			(this.v5t = void 0),
			(this.AUr = !0),
			(this.EPe = void 0),
			(this.Iki = () => new BuffGridItem()),
			(this.nNt = () => {
				var e,
					t = [];
				let i = 1;
				for (const s of this.UUr)
					s.Selected &&
						(((e = new BossRushModel_1.BossRushBuffInfo()).BuffId = s.BuffId),
						(e.ChangeAble = !0),
						(e.State = s.State),
						(e.Slot = i),
						i++,
						t.push(e));
				var s = this.PUr();
				if (s < this.RUr.GetBuffMaxCount())
					for (let e = s; e < this.RUr.GetBuffMaxCount(); e++) {
						var o = this.RUr.GetIndexPrepareSelectBuff(e),
							r = new BossRushModel_1.BossRushBuffInfo();
						(r.BuffId = 0),
							(r.ChangeAble = o.ChangeAble),
							(r.State =
								0 === r.BuffId &&
								o.State === Protocol_1.Aki.Protocol.ABs.Proto_Selected
									? Protocol_1.Aki.Protocol.ABs.Proto_Empty
									: o.State),
							(r.Slot = i),
							i++,
							t.push(r);
					}
				this.RUr.SetPrepareSelectBuff(t),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnChangeBossRushBuff,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RequestChangeBossRushView,
						"BossRushLevelDetailView",
					);
			}),
			(this.kqe = (e) => {
				(e.Selected = !e.Selected), this.Mni(), this.JBi();
			}),
			(this.xUr = (e) => {
				if (this.AUr) return !0;
				if (e.State !== Protocol_1.Aki.Protocol.ABs.KPs) {
					if (e.Selected) return !0;
					if (this.wUr()) return !0;
				}
				return !1;
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[3, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[2, this.nNt]]);
	}
	OnStart() {
		(this.v5t = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(0),
			this.GetItem(3).GetOwner(),
			this.Iki,
		)),
			this.GetItem(3).SetUIActive(!1),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnBossRushBuffViewOpened,
			);
	}
	OnBeforeShow() {
		this.Ebn(),
			(this.RUr = ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo),
			(this.UUr = []);
		for (const t of this.RUr.GetOptionBuff()) {
			var e = new BuffScrollItemData();
			(e.BuffId = t.BuffId),
				(e.State = t.State),
				(e.Selected =
					-1 !==
					this.RUr.GetPrepareSelectBuff().findIndex(
						(e) => e.BuffId === t.BuffId,
					)),
				(e.SelectedAtStart = e.Selected),
				(e.OnClickToggle = this.kqe),
				(e.CheckClickAble = this.xUr),
				this.UUr.push(e);
		}
		this.Mni(), this.JBi();
	}
	Ebn() {
		let e = "Start";
		ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation &&
			(e = "ShowView"),
			this.EPe?.PlaySequencePurely(e),
			(ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !1);
	}
	wUr() {
		return (
			!!this.AUr ||
			this.RUr.LevelInfo.GetMaxBuffCount() > this.PUr() ||
			(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"BossRushMaxBuffText",
			),
			!1)
		);
	}
	PUr() {
		let e = 0;
		for (const t of this.UUr) t.Selected && e++;
		return e;
	}
	Mni() {
		if (this.v5t) {
			var e = [];
			this.AUr = !0;
			for (let i = 0; i < this.UUr.length; i += 2) {
				var t = new BuffGridItemData();
				if (((t.BuffScrollItemData1 = this.UUr[i]), i + 1 >= this.UUr.length)) {
					e.push(t);
					break;
				}
				(t.BuffScrollItemData2 = this.UUr[i + 1]), e.push(t);
			}
			this.v5t.RefreshByData(e, !1, () => {
				this.AUr = !1;
			}),
				this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(0 < e.length);
		}
	}
	OnBeforeHide() {
		this.v5t?.ClearGridProxies();
	}
	JBi() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(1),
			"BossRushSelectBuffText",
			this.PUr().toString(),
			this.RUr.LevelInfo.GetMaxBuffCount().toString(),
		);
	}
}
exports.BossRushBuffSelectView = BossRushBuffSelectView;
class BuffScrollItemData {
	constructor() {
		(this.BuffId = 0),
			(this.ChangeAble = !0),
			(this.State = Protocol_1.Aki.Protocol.ABs.Proto_Empty),
			(this.Selected = !1),
			(this.SelectedAtStart = !1),
			(this.OnClickToggle = () => {}),
			(this.CheckClickAble = void 0);
	}
}
class BuffGridItemData {
	constructor() {
		(this.BuffScrollItemData1 = void 0), (this.BuffScrollItemData2 = void 0);
	}
}
class BuffGridItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.BUr = void 0),
			(this.bUr = void 0),
			(this.Znt = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		this.sGe();
	}
	async sGe() {
		(this.Znt = new CustomPromise_1.CustomPromise()),
			(this.BUr = new BuffScrollItem()),
			await this.BUr.CreateByActorAsync(this.GetItem(0).GetOwner()),
			this.BUr.SetActive(!0),
			(this.bUr = new BuffScrollItem()),
			await this.bUr.CreateByActorAsync(this.GetItem(1).GetOwner()),
			this.bUr.SetActive(!0),
			this.Znt.SetResult();
	}
	Refresh(e, t, i) {
		this.qUr(e, t, i);
	}
	async qUr(e, t, i) {
		await this.Znt?.Promise,
			this.BUr.Refresh(e.BuffScrollItemData1, t, i),
			this.GetItem(0).SetAlpha(1),
			this.BUr.SetInteractive(!0),
			e.BuffScrollItemData2
				? (this.GetItem(1).SetAlpha(1),
					this.bUr.SetInteractive(!0),
					this.bUr.Refresh(e.BuffScrollItemData2, t, i))
				: (this.GetItem(1).SetAlpha(0),
					this.GetItem(1).SetRaycastTarget(!1),
					this.bUr.SetInteractive(!1));
	}
}
class BuffScrollItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Y6i = void 0),
			(this.r7e = () =>
				!!this.Y6i &&
				((this.Y6i.State === Protocol_1.Aki.Protocol.ABs.KPs &&
					0 === this.GetExtendToggle(0).GetToggleState()) ||
					this.Y6i.CheckClickAble(this.Y6i))),
			(this.kqe = () => {
				this.Y6i.OnClickToggle(this.Y6i);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.kqe]]);
	}
	OnStart() {
		this.GetExtendToggle(0).CanExecuteChange.Unbind(),
			this.GetExtendToggle(0).CanExecuteChange.Bind(this.r7e),
			this.GetExtendToggle(0).SetToggleState(0);
	}
	SetInteractive(e) {
		this.GetExtendToggle(0).SetSelfInteractive(e);
	}
	Refresh(e, t, i) {
		(this.Y6i = e).State !== Protocol_1.Aki.Protocol.ABs.Proto_Inactive &&
			(this.L7e(), this.Oqe(), this.C4e(), this.Pqe(), this.GUr(), this.SOn());
	}
	SOn() {
		this.GetItem(5).SetUIActive(this.Y6i.SelectedAtStart);
	}
	Oqe() {
		var e = this.Y6i.Selected ? 1 : 0;
		this.GetExtendToggle(0).SetToggleState(e);
	}
	L7e() {
		this.GetItem(4).SetUIActive(
			this.Y6i.State === Protocol_1.Aki.Protocol.ABs.KPs,
		);
	}
	C4e() {
		var e =
			ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
				this.Y6i.BuffId,
			);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
	}
	Pqe() {
		var e =
				ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
					this.Y6i.BuffId,
				),
			t = [];
		for (const s of e.DescriptionParam) {
			var i = RegExp(/\[(.*?)\]/g).exec(s);
			i && 1 < i.length && t.push(...i[1].split(","));
		}
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.Description, ...t);
	}
	GUr() {
		var e =
			ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
				this.Y6i.BuffId,
			).Texture;
		this.SetTextureByPath(e, this.GetTexture(1));
	}
}
