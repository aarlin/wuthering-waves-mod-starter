"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MiniMap = void 0);
const UE = require("ue"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	BattleUiDefine_1 = require("../../../BattleUi/BattleUiDefine"),
	TaskMarkItem_1 = require("../../Marks/MarkItem/TaskMarkItem"),
	MapMarkMgr_1 = require("./Assistant/MapMarkMgr"),
	MapTileMgr_1 = require("./Assistant/MapTileMgr");
class MiniMap extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i, s = 1, a) {
		super(),
			(this.MapType = 1),
			(this.CUi = void 0),
			(this.gUi = void 0),
			(this.fUi = void 0),
			(this.dUi = 1),
			(this.lRi = 1),
			(this.I_t = void 0),
			(this.MUi = () => {
				this.gUi.OnMapSetUp(),
					this.CUi.OnMapSetup(),
					this.RootItem.SetUIActive(!0);
			}),
			(this.MapType = e),
			(this.dUi = i),
			(this.lRi = s),
			(this.I_t = t),
			(this.fUi = a);
	}
	OnBeforeDestroy() {
		this.UnBindEvents(),
			this.CUi?.Dispose(),
			(this.CUi = void 0),
			this.gUi?.Dispose(),
			(this.gUi = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[2, UE.UITexture],
			[1, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UITexture],
			[5, UE.UIItem],
		];
	}
	OnStart() {
		this.SetMapScale(this.dUi),
			this.FXt(this.lRi),
			this.uje(),
			this.RootItem.SetUIActive(!1),
			this.RootItem.SetHierarchyIndex(0);
	}
	FXt(e) {
		var t = this.GetItem(0),
			i = this.GetItem(1),
			s = this.GetTexture(2),
			a = this.GetItem(3),
			n = this.GetTexture(4),
			r = this.GetItem(5);
		(this.CUi = new MapMarkMgr_1.MapMarkMgr(this.MapType, t, this.I_t, e)),
			this.CUi.Initialize(),
			(this.gUi = new MapTileMgr_1.MapTileMgr(
				this.RootItem,
				i,
				s,
				a,
				n,
				this.MapType,
				this.fUi,
				r,
			)),
			this.gUi.Initialize();
	}
	uje() {
		ModelManager_1.ModelManager.GameModeModel.WorldDone
			? this.MUi()
			: EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.WorldDone,
					this.MUi,
				);
	}
	UnBindEvents() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.WorldDone,
			this.MUi,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				this.MUi,
			);
	}
	MiniMapUpdateMarkItems(e, t, i) {
		this.CUi.UpdateNearbyMarkItem(
			i,
			(s) => {
				s.LogicUpdate(i), (s.IsInAoiRange = !0), s.ViewUpdate(i);
				var a = s.UiPosition;
				if (a) {
					const i = Vector2D_1.Vector2D.Create(a.X, a.Y);
					if (s.IsTracked) {
						const n = Vector2D_1.Vector2D.Create();
						i.Multiply(t, n).Addition(e, n);
						let r = !1;
						s instanceof TaskMarkItem_1.TaskMarkItem &&
							(r = (a = s.View).IsRangeImageActive() ?? !1),
							n.Size() > BattleUiDefine_1.CLAMP_RANGE && !r
								? (n
										.DivisionEqual(n.Size())
										.MultiplyEqual(BattleUiDefine_1.CLAMP_RANGE)
										.SubtractionEqual(e)
										.DivisionEqual(t),
									s.GetRootItemAsync().then((e) => {
										e?.SetAnchorOffset(n.ToUeVector2D(!0));
									}))
								: s.GetRootItemAsync().then((e) => {
										e?.SetAnchorOffset(i.ToUeVector2D(!0));
									});
					} else
						s.GetRootItemAsync().then((e) => {
							e?.SetAnchorOffset(i.ToUeVector2D(!0));
						});
				}
			},
			(e) => {
				e.IsInAoiRange = !1;
			},
		);
	}
	UpdateMinimapTiles(e) {
		this.gUi.UpdateMinimapTiles(e);
	}
	SetMapScale(e) {
		this.RootItem.SetWorldScale3D(new UE.Vector(e, e, e));
	}
}
exports.MiniMap = MiniMap;
