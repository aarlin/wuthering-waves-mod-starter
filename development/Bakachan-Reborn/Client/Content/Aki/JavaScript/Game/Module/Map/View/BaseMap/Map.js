"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseMap = void 0);
const UE = require("ue"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
	MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
	MapTileMgr_1 = require("./Assistant/MapTileMgr");
class BaseMap extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i, s = 1, a = 100, r) {
		super(),
			(this.SelfPlayerNode = void 0),
			(this.PlayerArrow = void 0),
			(this.PlayerOutOfBoundIndicator = void 0),
			(this.MapType = 2),
			(this.dUi = 1),
			(this.lRi = 1),
			(this.CUi = void 0),
			(this.gUi = void 0),
			(this.fUi = void 0),
			(this.I_t = void 0),
			(this.pUi = 100),
			(this.vUi = void 0),
			(this.MUi = () => {
				this.gUi.OnMapSetUp(),
					this.CUi.OnMapSetup(),
					this.RootItem.SetUIActive(!0);
			}),
			(this.fUi = r),
			(this.dUi = t),
			(this.lRi = s),
			(this.MapType = e),
			(this.I_t = i),
			(this.pUi = a);
	}
	get MapRootItem() {
		return this.RootItem;
	}
	OnBeforeDestroy() {
		this.UnBindEvents(),
			this.CUi.Dispose(),
			(this.CUi = void 0),
			this.gUi.Dispose(),
			(this.gUi = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UITexture],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UITexture],
		];
	}
	OnStart() {
		this.SetMapScale(this.dUi),
			this.FXt(this.lRi),
			this.uje(),
			this.RootItem.SetUIActive(!1),
			2 === this.MapType && this.MUi(),
			(this.SelfPlayerNode = this.GetItem(0)),
			(this.PlayerOutOfBoundIndicator = this.GetItem(2)),
			(this.PlayerArrow = this.GetItem(1)),
			this.RootItem.SetHierarchyIndex(0);
		var e = this.GetItem(6);
		e.SetWidth(2 * this.pUi),
			e.SetHeight(2 * this.pUi),
			e.SetUIActive(!1),
			(this.vUi = new LevelSequencePlayer_1.LevelSequencePlayer(e));
	}
	FXt(e) {
		var t = this.GetItem(3),
			i = this.GetItem(4),
			s = this.GetTexture(5),
			a = this.GetItem(7),
			r = this.GetTexture(8);
		(this.CUi = new MapMarkMgr_1.MapMarkMgr(this.MapType, t, this.I_t, e)),
			this.CUi.Initialize(),
			(this.gUi = new MapTileMgr_1.MapTileMgr(
				this.RootItem,
				i,
				s,
				a,
				r,
				this.MapType,
				this.fUi,
			)),
			this.gUi.Initialize();
	}
	get MarkContainer() {
		return this.GetItem(3);
	}
	uje() {
		2 !== this.MapType &&
			(ModelManager_1.ModelManager.GameModeModel.WorldDone
				? this.MUi()
				: EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.WorldDone,
						this.MUi,
					));
	}
	UnBindEvents() {
		2 !== this.MapType &&
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.WorldDone,
				this.MUi,
			) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.MUi,
			);
	}
	GetAllMarkItems() {
		return this.CUi.GetAllMarkItems();
	}
	GetMarkItemsByType(e) {
		return this.CUi.GetMarkItemsByType(e);
	}
	GetMarkItemsByClickPosition(e) {
		return this.CUi.GetMarkItemsByClickPosition(e);
	}
	GetMarkItem(e, t) {
		return this.CUi.GetMarkItem(e, t);
	}
	CreateCustomMark(e) {
		return this.CUi.CreateDynamicMark(e);
	}
	get MapOffset() {
		return this.gUi.MapOffset;
	}
	get FakeOffset() {
		return this.gUi.FakeOffset;
	}
	ShowSubMapTile(e, t, i) {
		this.gUi.ShowSubMapByPosition(e, t, i);
	}
	HideSubMapTile() {
		this.gUi.HideSubMap();
	}
	GetSubMapGroupIdByPosition() {
		return this.gUi.GetSubMapGroupByRootItemPosition();
	}
	SetMapScale(e) {
		this.RootItem.SetUIRelativeScale3D(new UE.Vector(e, e, e));
	}
	HandleAreaOpen(e) {
		this.gUi.HandleAreaOpen(e);
	}
	HandleMapTileDelegate() {
		this.gUi.HandleDelegate();
	}
	UnBindMapTileDelegate() {
		this.gUi.UnBindDelegate();
	}
	HandleSceneGamePlayMarkItemOpen(e, t, i) {
		(e = this.GetMarkItemsByType(e)) &&
			e.forEach((e) => {
				e &&
					e.MarkConfig &&
					e.MarkConfig.RelativeSubType === i &&
					((e.IsCanShowView = !0),
					e
						.ViewUpdateAsync(
							GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
						)
						.then(
							() => {
								e.View?.PlayUnlockSequence();
							},
							void 0,
						));
			});
	}
	SetClickRangeVisible(e, t = Vector2D_1.Vector2D.Create(0, 0)) {
		var i = this.GetItem(6);
		i.SetUIActive(e),
			i.SetWorldScale3D(new UE.Vector(1, 1, 1)),
			e &&
				(i?.SetAnchorOffset(t.ToUeVector2D(!0)),
				this.vUi?.PlayLevelSequenceByName("Start"));
	}
}
exports.BaseMap = BaseMap;
