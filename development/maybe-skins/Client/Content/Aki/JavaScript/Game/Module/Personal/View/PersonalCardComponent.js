"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalCardComponent = void 0);
const UE = require("ue"),
	BackgroundCardAll_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardAll"),
	BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	PersonalController_1 = require("../Controller/PersonalController"),
	PersonalCardBaseItem_1 = require("./PersonalCardBaseItem"),
	PersonalCardItem_1 = require("./PersonalCardItem"),
	ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
	UiManager_1 = require("../../../Ui/UiManager");
class PersonalCardComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, r) {
		super(),
			(this.xqe = void 0),
			(this.X4i = 0),
			(this.$4i = void 0),
			(this.Y4i = (e) => {
				for (const t of this.xqe.GetScrollItemMap().values())
					if (t.GetConfig().Id === e) {
						t.RefreshRedDot();
						break;
					}
			}),
			(this.u7t = () => {
				var e, t;
				this.L0 ||
					((e = this.v4i.CurCardId),
					(t = PersonalController_1.PersonalController.CheckCardIsUnLock(
						this.X4i,
					)),
					this.GetButton(6).RootUIComp.SetUIActive(e !== this.X4i && t));
			}),
			(this.p4t = () => {
				PersonalController_1.PersonalController.SendChangeCardRequest(this.X4i),
					UiManager_1.UiManager.CloseView("PersonalEditView"),
					UiManager_1.UiManager.CloseView("PersonalOptionView");
			}),
			(this.J4i = (e, t, r) => {
				let i;
				return (
					this.L0
						? (i = new PersonalCardBaseItem_1.PersonalCardBaseItem(t, e))
						: (i = new PersonalCardItem_1.PersonalCardItem(
								t,
								e,
							)).RefreshRedDot(),
					i.SetToggleState(e.Id === this.X4i ? 1 : 0),
					e.Id === this.X4i && (this.$4i = i),
					i.SetToggleCallBack(this.z4i),
					{ Key: e.Id, Value: i }
				);
			}),
			(this.z4i = (e) => {
				this.$4i && this.$4i.SetToggleState(0), (this.X4i = e.Id);
				var t,
					r = this.v4i.CardUnlockList,
					i = r.length;
				for (let t = 0; t < i; t++) {
					var n = r[t];
					if (n.CardId === e.Id && !n.IsRead) {
						PersonalController_1.PersonalController.SendReadCardRequest(e.Id);
						break;
					}
				}
				this.L0 ||
					((o = this.v4i.CurCardId),
					(t = PersonalController_1.PersonalController.CheckCardIsUnLock(e.Id)),
					this.GetButton(6).RootUIComp.SetUIActive(o !== this.X4i && t)),
					this.RefreshCardInfo(e);
				var o = this.xqe.GetScrollItemByKey(e.Id);
				this.$4i = o;
			}),
			(this.L0 = t),
			(this.v4i = r),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIItem],
		]),
			this.L0 ||
				(this.ComponentRegisterInfos.push(
					[6, UE.UIButtonComponent],
					[7, UE.UIText],
				),
				(this.BtnBindInfo = [[6, this.p4t]]));
	}
	OnStart() {
		let e = [];
		if (this.L0) {
			var t = this.v4i.CardUnlockList,
				r = t.length;
			for (let n = 0; n < r; n++) {
				var i = t[n];
				i = BackgroundCardById_1.configBackgroundCardById.GetConfig(i.CardId);
				e.push(i);
			}
		} else
			(e = ConfigCommon_1.ConfigCommon.ToList(
				BackgroundCardAll_1.configBackgroundCardAll.GetConfigList(),
			)).sort((e, t) =>
				(e =
					void 0 !==
					ModelManager_1.ModelManager.PersonalModel.GetCardUnlockData(e.Id)) !=
				(void 0 !==
					ModelManager_1.ModelManager.PersonalModel.GetCardUnlockData(t.Id))
					? e
						? -1
						: 1
					: 0,
			);
		var n;
		this.xqe ||
			(this.xqe = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(0),
				this.J4i,
			)),
			0 < e.length &&
				((n = this.v4i.CurCardId),
				(this.X4i = void 0 !== n && 0 !== n ? n : e[0].Id),
				(n = BackgroundCardById_1.configBackgroundCardById.GetConfig(this.X4i)),
				this.RefreshCardInfo(n)),
			this.xqe.ClearChildren(),
			this.xqe.RefreshByData(e),
			this.GetItem(5).SetUIActive(0 < e.length),
			this.L0 ||
				((n = this.v4i.CardUnlockList),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(7),
					"Collected",
					n.length,
				),
				this.GetButton(6).RootUIComp.SetUIActive(!1)),
			this.AddEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPersonalCardRead,
			this.Y4i,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnCardChange,
				this.u7t,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPersonalCardRead,
			this.Y4i,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnCardChange,
				this.u7t,
			);
	}
	RefreshCardInfo(e) {
		this.SetTextureByPath(e.CardPath, this.GetTexture(1)),
			this.GetText(2).ShowTextNew(e.Title),
			this.GetText(3).ShowTextNew(e.AttributesDescription),
			this.GetText(4).ShowTextNew(e.Tips);
	}
	OnBeforeDestroy() {
		this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
			this.RemoveEventListener();
	}
}
exports.PersonalCardComponent = PersonalCardComponent;
