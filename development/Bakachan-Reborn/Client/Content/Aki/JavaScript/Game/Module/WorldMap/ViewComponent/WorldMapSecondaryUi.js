"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapSecondaryUi = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	PopupTypeRightItem_1 = require("../../../Ui/Common/PopupTypeRightItem"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class WorldMapSecondaryUi extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.InnerPointerIsInView = !1),
			(this.UiBgItem = void 0),
			(this._Fo = void 0),
			(this.uFo = void 0),
			(this.WFt = (e) => {
				"Close" === e && this.mIt();
			}),
			(this.Close = (e, t = !0) => {
				(this.uFo = e),
					t ? this.EPe.PlayLevelSequenceByName("Close") : this.mIt();
			});
	}
	get EPe() {
		var e;
		return (
			this._Fo ||
				((e = this.UiBgItem?.GetRootItem() ?? this.GetRootItem()),
				(this._Fo = new LevelSequencePlayer_1.LevelSequencePlayer(e)),
				this._Fo.BindSequenceCloseEvent(this.WFt)),
			this._Fo
		);
	}
	OnBeforeCreate() {
		this.GetNeedBgItem() &&
			(this.UiBgItem = new PopupTypeRightItem_1.PopupTypeRightItem());
	}
	OnBeforeDestroyImplementImplement() {}
	OnBeforeDestroyImplement() {
		this.OnBeforeDestroyImplementImplement(),
			this._Fo?.Clear(),
			(this._Fo = void 0);
	}
	async OnBeforeStartAsync() {
		var e;
		this.UiBgItem &&
			(await this.UiBgItem.CreateByResourceIdAsync(
				"UiView_PopupR",
				this.ParentUiItem,
				this.UsePool,
			),
			(e = this.GetOriginalActor().GetComponentByClass(
				UE.UIItem.StaticClass(),
			)),
			this.UiBgItem.AttachItem(e, this.GetRootItem()),
			this.UiBgItem.SetPopupViewBase(),
			this.UiBgItem.OverrideBackBtnCallBack(this.Close),
			this.AddChild(this.UiBgItem));
	}
	mIt() {
		this.SetActive(!1),
			this.OnCloseWorldMapSecondaryUi(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
			),
			this.uFo && this.uFo();
	}
	get PointerIsInView() {
		return this.InnerPointerIsInView;
	}
	ShowPanel(...e) {
		this.RootItem.SetAlpha(1),
			this.SetActive(!0),
			this.OnShowWorldMapSecondaryUi(...e),
			this.EPe.PlayLevelSequenceByName("Start"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
			);
	}
	OnShowWorldMapSecondaryUi() {}
	OnCloseWorldMapSecondaryUi() {}
	GetResourceId() {
		return "";
	}
	GetGuideFocusUiItem() {}
	GetNeedBgItem() {
		return !0;
	}
}
exports.WorldMapSecondaryUi = WorldMapSecondaryUi;
