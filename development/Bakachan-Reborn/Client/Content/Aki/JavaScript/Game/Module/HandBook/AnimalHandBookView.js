"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalHandBookView = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
	CommonTabItemBase_1 = require("../Common/TabComponent/TabItem/CommonTabItemBase"),
	UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	HandBookBaseView_1 = require("./HandBookBaseView"),
	HandBookCommonItem_1 = require("./HandBookCommonItem"),
	HandBookController_1 = require("./HandBookController"),
	HandBookDefine_1 = require("./HandBookDefine");
class AnimalHandBookView extends HandBookBaseView_1.HandBookBaseView {
	constructor() {
		super(...arguments),
			(this.wzt = []),
			(this.Bzt = []),
			(this.bzt = void 0),
			(this.InitHandBookCommonItem = () => {
				var e = new HandBookCommonItem_1.HandBookCommonItem();
				return (
					e.BindOnExtendToggleStateChanged(this.OnToggleClick),
					this.Bzt.push(e),
					e
				);
			}),
			(this.OnToggleClick = (e) => {
				var t,
					n = e.Data;
				e = e.MediumItemGrid.GridIndex;
				this.ScrollViewCommon.DeselectCurrentGridProxy(),
					this.ScrollViewCommon.SelectGridProxy(e),
					this.ScrollViewCommon.RefreshGridProxy(e),
					HandBookController_1.HandBookController.ClearEffect(),
					n.IsLock
						? this.SetLockState(!0)
						: ((e = n.Config),
							n.IsNew &&
								HandBookController_1.HandBookController.SendIllustratedReadRequest(
									4,
									e.Id,
								),
							this.SetLockState(!1),
							(t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
								4,
								e.Id,
							)) && this.SetDateText(t.CreateTime),
							n.IsNew &&
								HandBookController_1.HandBookController.SendIllustratedReadRequest(
									4,
									e.Id,
								),
							(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
							this.SetNameText(t),
							(n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								e.Descrtption,
							)),
							this.SetTypeText(n),
							this.RefreshInfoItemLayout(e),
							this.RefreshDropItem(e),
							HandBookController_1.HandBookController.SetAnimalMeshShow(
								e.Id,
								this.qzt,
							));
			}),
			(this.Refresh = () => {
				this.wzt =
					ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
				var e = [],
					t = this.wzt.length;
				for (let r = 0; r < t; r++) {
					var n = this.wzt[r],
						o =
							void 0 ===
							(a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
								4,
								n.Id,
							)),
						a = void 0 !== a && !a.IsRead,
						i = new HandBookDefine_1.HandBookCommonItemData();
					(i.Icon = n.Icon),
						(i.Config = n),
						(i.IsLock = o),
						(i.IsNew = a),
						e.push(i);
				}
				(this.Bzt = []), this.InitScrollViewByCommonItem(e);
				var r =
					ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(
						4,
					);
				this.InitCommonTabTitle(
					r.TitleIcon,
					new CommonTabTitleData_1.CommonTabTitleData(r.Name),
				),
					this.RefreshCollectText();
			}),
			(this.OnHandBookRead = (e, t) => {
				if (4 === e) {
					var n = this.Bzt.length;
					for (let e = 0; e < n; e++) {
						var o = this.Bzt[e];
						if (o.GetData().Config.Id === t)
							return void o.SetNewFlagVisible(!1);
					}
				}
			}),
			(this.qzt = void 0);
	}
	OnStart() {
		this.SetDefaultState(), this.Refresh(), this.RefreshLockText();
	}
	OnAfterShow() {
		this.bzt =
			UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
				"1062",
			);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnHandBookDataInit,
			this.Refresh,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookDataUpdate,
				this.Refresh,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnHandBookDataInit,
			this.Refresh,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHandBookDataUpdate,
				this.Refresh,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHandBookRead,
				this.OnHandBookRead,
			);
	}
	GetTabItemData(e) {
		var t = new Array(),
			n = this.TabList.length;
		for (let e = 0; e < n; e++) {
			var o = new CommonTabItemBase_1.CommonTabItemData();
			(o.Index = e), (o.Data = this.TabList[e]), t.push(o);
		}
		return t;
	}
	RefreshCollectText() {
		var e = HandBookController_1.HandBookController.GetCollectProgress(4);
		this.SetCollectText(e[0], e[1]);
	}
	RefreshLockText() {
		var e =
			ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"AnimalHandBookLock",
			);
		this.SetLockText(e);
	}
	RefreshDropItem(e) {
		var t = [],
			n = e.DropItemId,
			o = n.length;
		for (let e = 0; e < o; e++) {
			var a = n[e];
			t.push([{ IncId: 0, ItemId: a }, 0]);
		}
	}
	RefreshInfoItemLayout(e) {
		var t = [];
		e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TypeDescrtption);
		t.push(e), this.InitInfoItemLayout(t);
	}
	OnBeforePlayCloseSequence() {
		UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
			this.bzt,
		);
	}
	OnBeforeCreate() {
		UiSceneManager_1.UiSceneManager.InitHandBookObserver(),
			(this.qzt = UiSceneManager_1.UiSceneManager.GetHandBookObserver());
	}
	OnBeforeDestroy() {
		UiSceneManager_1.UiSceneManager.DestroyHandBookObserver(),
			(this.qzt = void 0),
			HandBookController_1.HandBookController.ClearEffect(),
			(this.wzt = []),
			(this.Bzt = []);
	}
}
exports.AnimalHandBookView = AnimalHandBookView;
