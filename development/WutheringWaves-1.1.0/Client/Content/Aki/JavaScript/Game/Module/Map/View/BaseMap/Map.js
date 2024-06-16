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
	constructor(e, t, i, s = 1, r = 100, h) {
		super(),
			(this.SelfPlayerNode = void 0),
			(this.PlayerArrow = void 0),
			(this.PlayerOutOfBoundIndicator = void 0),
			(this.MapType = 2),
			(this.xDi = 1),
			(this.ULi = 1),
			(this.PDi = void 0),
			(this.wDi = void 0),
			(this.BDi = void 0),
			(this.Plt = void 0),
			(this.bDi = 100),
			(this.qDi = void 0),
			(this.GDi = () => {
				this.wDi.OnMapSetUp(),
					this.PDi.OnMapSetup(),
					this.RootItem.SetUIActive(!0);
			}),
			(this.BDi = h),
			(this.xDi = t),
			(this.ULi = s),
			(this.MapType = e),
			(this.Plt = i),
			(this.bDi = r);
	}
	get MapRootItem() {
		return this.RootItem;
	}
	OnBeforeDestroy() {
		this.UnBindEvents(),
			this.PDi.Dispose(),
			(this.PDi = void 0),
			this.wDi.Dispose(),
			(this.wDi = void 0);
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
		];
	}
	OnStart() {
		this.SetMapScale(this.xDi),
			this.lQt(this.ULi),
			this.q7e(),
			this.RootItem.SetUIActive(!1),
			2 === this.MapType && this.GDi(),
			(this.SelfPlayerNode = this.GetItem(0)),
			(this.PlayerOutOfBoundIndicator = this.GetItem(2)),
			(this.PlayerArrow = this.GetItem(1)),
			this.RootItem.SetHierarchyIndex(0);
		var e = this.GetItem(6);
		e.SetWidth(2 * this.bDi),
			e.SetHeight(2 * this.bDi),
			e.SetUIActive(!1),
			(this.qDi = new LevelSequencePlayer_1.LevelSequencePlayer(e));
	}
	lQt(e) {
		var t = this.GetItem(3),
			i = this.GetItem(4),
			s = this.GetTexture(5);
		(this.PDi = new MapMarkMgr_1.MapMarkMgr(this.MapType, t, this.Plt, e)),
			this.PDi.Initialize(),
			(this.wDi = new MapTileMgr_1.MapTileMgr(
				this.RootItem,
				i,
				s,
				this.MapType,
				this.BDi,
			)),
			this.wDi.Initialize();
	}
	get MarkContainer() {
		return this.GetItem(3);
	}
	q7e() {
		2 !== this.MapType &&
			(ModelManager_1.ModelManager.GameModeModel.WorldDone
				? this.GDi()
				: EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.WorldDone,
						this.GDi,
					));
	}
	UnBindEvents() {
		2 !== this.MapType &&
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.WorldDone,
				this.GDi,
			) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.GDi,
			);
	}
	GetAllMarkItems() {
		return this.PDi.GetAllMarkItems();
	}
	GetMarkItemsByType(e) {
		return this.PDi.GetMarkItemsByType(e);
	}
	GetMarkItemsByClickPosition(e) {
		return this.PDi.GetMarkItemsByClickPosition(e);
	}
	GetMarkItem(e, t) {
		return this.PDi.GetMarkItem(e, t);
	}
	CreateCustomMark(e) {
		return this.PDi.CreateDynamicMark(e);
	}
	get MapOffset() {
		return this.wDi.MapOffset;
	}
	get FakeOffset() {
		return this.wDi.FakeOffset;
	}
	SetMapScale(e) {
		this.RootItem.SetWorldScale3D(new UE.Vector(e, e, e));
	}
	HandleAreaOpen(e) {
		this.wDi.HandleAreaOpen(e);
	}
	HandleMapTileDelegate() {
		this.wDi.HandleDelegate();
	}
	UnBindMapTileDelegate() {
		this.wDi.UnBindDelegate();
	}
	HandleSceneGamePlayMarkItemOpen(e, t, i) {
		e = this.GetMarkItemsByType(e);
		e &&
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
								e.View?.PlayUnlockSequence().finally(void 0);
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
				this.qDi?.PlayLevelSequenceByName("Start"));
	}
}
exports.BaseMap = BaseMap;
//# sourceMappingURL=Map.js.map
