"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CustomMarkPanel = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ButtonAndTextItem_1 = require("../../../Common/Button/ButtonAndTextItem"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapDefine_1 = require("../../WorldMapDefine"),
	MarkIconOption_1 = require("./MarkIconOption"),
	CUSTOM_MARK_PANEL_WIDTH = 778,
	CUSTOM_MARK_PANEL_HEIGHT = 592;
class CustomMarkPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.UUt = void 0),
			(this.pko = void 0),
			(this.vko = void 0),
			(this.dko = void 0),
			(this.Mko = !1),
			(this.V9s = !1),
			(this.Sko = 0),
			(this.Eko = () => {
				this.V9s ||
					(MapController_1.MapController.RequestTrackMapMark(
						this.dko.MarkType,
						this.dko.MarkId,
						!this.Mko,
					),
					(this.V9s = !0),
					(this.Mko = !this.Mko),
					this.ono(this.Mko),
					this.Close());
			}),
			(this.yko = () => {
				if (!this.V9s) {
					switch (this.Sko) {
						case 0:
							MapController_1.MapController.RequestCreateCustomMark(
								this.dko.TrackPosition,
								this.dko.ConfigId,
							);
							break;
						case 1:
							MapController_1.MapController.RequestRemoveMapMark(
								9,
								this.dko.MarkId,
							);
					}
					(this.V9s = !0), this.Close();
				}
			});
	}
	GetResourceId() {
		return "UiItem_CustomMarkPanel_Prefab";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos =
			WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoB;
	}
	OnStart() {
		this.RootItem.SetRaycastTarget(!1),
			(this.UUt = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(7))),
			this.UUt.BindCallback(this.yko),
			(this.pko = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(8))),
			this.pko.BindCallback(this.Eko),
			(this.vko = []),
			this.Iko();
	}
	OnShowWorldMapSecondaryUi(t, e, o) {
		(this.Sko = e),
			(this.dko = t),
			(this.V9s = !1),
			this.Tko(e),
			this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
			(this.GetText(3).text =
				o + "/" + ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize),
			this.RootItem.SetUIActive(!0),
			this.SelectOptionChecked(t),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "CustomeMark"),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CustomeMarkTip");
	}
	SelectOptionChecked(t) {
		if (0 !== this.vko.length) {
			if (1 === this.Sko)
				for (const e of this.vko)
					if (e.Config.MarkPic === t.IconPath) return void e.SetToggleChecked();
			this.vko[0].SetToggleChecked();
		}
	}
	Tko(t) {
		let e;
		switch (this.Sko) {
			case 0:
				e =
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"Text_Add_Text",
					) ?? "";
				break;
			case 1:
				e =
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"HotKeyText_DeleteTips_Name",
					) ?? "";
		}
		this.UUt.SetText(e), this.ono(this.dko.IsTracked);
	}
	OnCloseWorldMapSecondaryUi() {
		(this.V9s = !1),
			this.dko &&
				0 === this.Sko &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RemoveMapMark,
					9,
					this.dko.MarkId,
				);
	}
	ono(t) {
		(this.Mko = t),
			(t =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					this.Mko
						? "Text_InstanceDungeonEntranceCancelTrack_Text"
						: "Text_InstanceDungeonEntranceTrack_Text",
				) ?? ""),
			this.pko.SetText(t),
			(t = 0 === this.Sko),
			this.pko.RefreshEnable(!t);
	}
	Lko(t, e) {
		1 === e &&
			(this.dko.IsNewCustomMarkItem ||
				MapController_1.MapController.RequestMapMarkReplace(this.dko.MarkId, t),
			this.dko.SetConfigId(t),
			this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1));
	}
	Iko() {
		var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetCustomMarks();
		if (t) {
			for (const i of t) {
				var e = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), this.GetItem(4)),
					o = new MarkIconOption_1.MarkIconOption();
				o.Initialize(e, this.GetItem(4), i),
					0 === this.Sko && 0 === this.vko.length && o.SetToggleChecked(),
					1 === this.Sko &&
						this.dko.IconPath === i.MarkPic &&
						o.SetToggleChecked(),
					o.SetOnclick(this.Lko.bind(this, i.MarkId)),
					this.vko.push(o);
			}
			this.GetItem(6).SetUIActive(!1);
		}
	}
}
(exports.CustomMarkPanel = CustomMarkPanel).PanelSize = new UE.Vector2D(
	778,
	592,
);
