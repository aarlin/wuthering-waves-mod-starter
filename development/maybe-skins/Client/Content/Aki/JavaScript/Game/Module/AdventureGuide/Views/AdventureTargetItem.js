"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdventureTargetItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
	RoleController_1 = require("../../RoleUi/RoleController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	WorldMapController_1 = require("../../WorldMap/WorldMapController");
class AdventureTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.eGe = void 0),
			(this.AdventureId = 0),
			(this.Pe = void 0),
			(this.b5e = void 0),
			(this.q5e = () =>
				new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
			(this.qOe = () => {
				this.G5e ||
					((this.G5e = !0),
					this.Pe.Status === Protocol_1.Aki.Protocol.bBs.Proto_Finish &&
						ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForAdventureReward(
							this.AdventureId,
						).finally(() => {
							this.G5e = !1;
						}));
			}),
			(this.G5e = !1),
			(this.N5e = () => {
				this.G5e ||
					((this.G5e = !0),
					this.Pe.Status === Protocol_1.Aki.Protocol.bBs.Proto_UnFinish &&
						(this.Ju(), (this.G5e = !1)));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIHorizontalLayout],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIScrollViewWithScrollbarComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[2, this.N5e],
				[9, this.qOe],
			]);
	}
	OnStart() {
		(this.eGe = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(3),
			this.q5e,
		)),
			(this.b5e = this.GetItem(1)
				.GetOwner()
				.GetComponentByClass(UE.UIExtendToggle.StaticClass())),
			this.b5e.OnPostAudioEvent.Bind((e) => {
				e && this.PostClickAudioEvent(e);
			}),
			this.b5e.OnPostAudioStateEvent.Bind((e, t) => {
				t && this.PostClickAudioEvent(t);
			});
	}
	OnBeforeDestroy() {
		this.b5e.OnPostAudioEvent.Unbind(), this.b5e.OnPostAudioStateEvent.Unbind();
	}
	Refresh(e, t, o) {
		this.G5e = !1;
		var r = (this.Pe = e).AdventureTaskBase,
			i =
				((this.AdventureId = e.AdventureTaskBase.Id),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r.TaskText),
				this.GetItem(1).SetUIActive(!1),
				e.GetTotalNum()),
			n =
				e.AdventureTaskBase.ChapterId <=
				ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter()
					? i
					: e.Progress,
			s = this.GetText(5),
			a =
				(0 !== i
					? (s.SetUIActive(!0), s.SetText(`(${n}/${i})`))
					: s.SetUIActive(!1),
				new Array()),
			l = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(
				r.DropIds,
			);
		for (const e of l.keys()) {
			var d = [{ IncId: 0, ItemId: e }, l.get(e)];
			a.push(d);
		}
		this.eGe.RefreshByDataAsync(a).then(() => {
			for (const t of this.eGe.GetLayoutItemList())
				t.SetReceivedVisible(
					e.Status === Protocol_1.Aki.Protocol.bBs.Proto_Received,
				);
			this.GetScrollViewWithScrollbar(6).ScrollTo(this.eGe.GetGrid(0));
		}),
			this.RootItem.SetUIActive(!0),
			this.O5e(
				e.Status,
				!this.Pe.AdventureTaskBase.JumpTo ||
					0 !== e.AdventureTaskBase.JumpTo?.size,
			);
	}
	O5e(e, t) {
		this.k5e(e), this.F5e(e), this.V5e(e, t), this.H5e(e), this.j5e(e, t);
	}
	j5e(e, t) {
		this.GetItem(7).SetUIActive(
			e === Protocol_1.Aki.Protocol.bBs.Proto_UnFinish && !t,
		);
	}
	k5e(e) {
		this.GetItem(8).SetUIActive(
			e === Protocol_1.Aki.Protocol.bBs.Proto_Received,
		);
	}
	F5e(e) {
		this.GetButton(9).RootUIComp.SetUIActive(
			e === Protocol_1.Aki.Protocol.bBs.Proto_Finish,
		);
	}
	V5e(e, t) {
		this.GetButton(2).RootUIComp.SetUIActive(
			e === Protocol_1.Aki.Protocol.bBs.Proto_UnFinish && t,
		);
	}
	H5e(e) {
		this.GetItem(4).SetUIActive(e === Protocol_1.Aki.Protocol.bBs.Proto_Finish);
	}
	Ju() {
		if (this.Pe?.AdventureTaskBase.JumpTo) {
			let r, i;
			for (var [e, t] of this.Pe.AdventureTaskBase.JumpTo) (r = e), (i = t);
			if (r && i)
				switch (r - 1) {
					case 0:
						UiManager_1.UiManager.OpenView("QuestView", Number(i));
						break;
					case 1:
						var o = ConfigManager_1.ConfigManager.MapConfig?.GetConfigMark(
							Number(i),
						);
						o
							? ((o = {
									MarkType: o.ObjectType,
									MarkId: o.MarkId,
									OpenAreaId: 0,
								}),
								WorldMapController_1.WorldMapController.OpenView(1, !1, o))
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"AdventureGuide",
									5,
									"配置了错误的开拓任务跳转参数",
									["Id: ", this.Pe.AdventureTaskBase.Id],
									["Parma: ", i],
								);
						break;
					case 2:
						"RoleRootView" === i
							? RoleController_1.RoleController.OpenRoleMainView(0)
							: UiManager_1.UiManager.OpenView(i);
						break;
					case 3:
						(o = i),
							RoleController_1.RoleController.OpenRoleMainView(0, 0, [], o);
						break;
					case 4:
						(o = { TabViewName: i, Param: void 0 }),
							UiManager_1.UiManager.OpenView("CalabashRootView", o);
						break;
					case 8:
						ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
							"DisposableChallengeView",
							Number(i),
						);
						break;
					default:
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"AdventureGuide",
								5,
								"配置了错误的开拓任务跳转类型",
								["Id: ", this.Pe.AdventureTaskBase.Id],
								["type: ", r],
							);
				}
		}
	}
}
exports.AdventureTargetItem = AdventureTargetItem;
