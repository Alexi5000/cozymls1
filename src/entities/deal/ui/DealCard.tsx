import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Deal } from "@/entities/deal/model/types";
import { formatDealValue, formatDealStage, formatDealDate } from "@/entities/deal/lib/formatters";
import { getDealStageColor, getDealProbabilityColor } from "@/entities/deal/lib/helpers";
import { DollarSign, Calendar, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  onView?: (deal: Deal) => void;
  onEdit?: (deal: Deal) => void;
  onDelete?: (deal: Deal) => void;
  compact?: boolean;
}

export function DealCard({ 
  deal, 
  onView, 
  onEdit, 
  onDelete, 
  compact = false 
}: DealCardProps) {
  const stageColor = getDealStageColor(deal.stage);
  const probabilityColor = getDealProbabilityColor(deal.probability);
  const formattedValue = formatDealValue(deal.value);
  const formattedStage = formatDealStage(deal.stage);
  const formattedDate = formatDealDate(deal.expectedCloseDate);

  if (compact) {
    return (
      <Card className="hover-lift animate-scale-in">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground truncate">{deal.title}</h3>
              <p className="text-xs text-muted-foreground">{formattedValue}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${stageColor} text-xs font-medium`}>
                {formattedStage}
              </Badge>
              <Badge className={`${probabilityColor} text-xs font-medium`}>
                {deal.probability}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover-lift animate-scale-in group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
              {deal.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Deal ID: {deal.id}</p>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onView && (
              <Button size="sm" variant="ghost" onClick={() => onView(deal)}>
                <Eye className="w-4 h-4" />
              </Button>
            )}
            {onEdit && (
              <Button size="sm" variant="ghost" onClick={() => onEdit(deal)}>
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(deal)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Deal Value */}
          <div className="flex items-center justify-between p-3 bg-gradient-card rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deal Value</p>
                <p className="text-xl font-bold text-foreground">{formattedValue}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Probability</p>
              <Badge className={`${probabilityColor} font-medium`}>
                {deal.probability}%
              </Badge>
            </div>
          </div>

          {/* Deal Stage */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Stage</span>
            </div>
            <Badge className={`${stageColor} font-medium`}>
              {formattedStage}
            </Badge>
          </div>

          {/* Expected Close Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Expected Close</span>
            </div>
            <span className="text-sm text-foreground font-medium">{formattedDate}</span>
          </div>

          {/* Deal Timeline */}
          <div className="pt-3 border-t border-border">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Created: {formatDealDate(deal.createdAt)}</span>
              <span>Updated: {formatDealDate(deal.updatedAt)}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${deal.probability}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {onView && (
              <Button size="sm" variant="outline" className="flex-1 hover-glow" onClick={() => onView(deal)}>
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
            )}
            {onEdit && (
              <Button size="sm" className="flex-1 btn-primary" onClick={() => onEdit(deal)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
